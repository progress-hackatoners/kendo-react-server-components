import React from "react";

import { DataGrid } from "kendo";
import { cookies } from "next/headers";
import { KendoGridState } from "kendo/src/components/data-grid/data-grid-server";

import { deserialize, serialize } from "../../utils";
import { initialDataGridState } from "kendo/src/components/data-grid/reducer";

async function getData({ page = 1, take = 10, sort = [] }: any = {}) {
  return fetch(
    `https://northwind.netcore.io/query/customers.json?skip=${
      take * (page - 1)
    }&take=${take}${sort
      .map((s: any) =>
        s.dir === "asc" ? `&orderBy=${s.field}` : `&orderByDesc=${s.field}`
      )
      .join("")}`,
    {
      cache: "force-cache",
    }
  )
    .then((resp) => resp.json())
    .then((json) => json.results);
}

async function fetchAdditionalData(id?: string | number) {
  return fetch(`https://northwind.netcore.io/query/orders.json?customerId=${id}`, {
    cache: "force-cache",
  })
    .then((resp) => resp.json())
    .then((json) => json.results);
}

const getState = async () => {
  return deserialize(
    cookies().get("kendo-grid")?.value || serialize(initialDataGridState)
  );
};

export default async function Page() {
  const onStateChange = async (state: KendoGridState) => {
    "use server";
    cookies().set("kendo-grid", serialize(state));
  };

  return (
    <div>
      <h1>Data Grid!</h1>
      {/* @ts-expect-error Async Server Component */}
      <DataGrid
        getData={getData}
        getState={getState}
        fetchAdditionalData={fetchAdditionalData}
        onStateChangeAction={onStateChange}
      />
    </div>
  );
}
