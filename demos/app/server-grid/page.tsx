import React from "react";

import { DataGrid } from "kendo";
import { cookies } from "next/headers";
import { KendoGridState } from "kendo/src/components/data-grid/data-grid-server";

import { deserialize, serialize } from "../../utils";
import { initialDataGridState } from "kendo/src/components/data-grid/reducer";
import { MasterRow } from "../../src/components/master-row.server";

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

export default async function Page() {
  const state = deserialize(
    cookies().get("kendo-grid")?.value || serialize(initialDataGridState)
  );

  const onStateChange = async (state: KendoGridState) => {
    "use server";
    cookies().set("kendo-grid", serialize(state));
  };

  return (
    <div>
      <h1>Data Grid!</h1>
      <DataGrid
        data={getData(state)}
        state={state}
        onStateChangeAction={onStateChange}
        Row={MasterRow}
      />
    </div>
  );
}
