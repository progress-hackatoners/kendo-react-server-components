import React from "react";

import { DataGrid } from "kendo";
import { cookies } from "next/headers";
import { KendoGridState } from "kendo/src/components/data-grid/data-grid-server";

import { deserialize, serialize } from "../../utils";
import { initialDataGridState } from "kendo/src/components/data-grid/reducer";
import { revalidateTag } from "next/cache";
// import { setState } from "../../actions";

async function getData({ page = 1, take = 10, sort = [] }: any = {}) {
  "use server";
  const res = await fetch(
    `http://localhost:3000/api/users?page=${page}&take=${take}&sort=${JSON.stringify(
      sort
    )}`,
    {
      cache: "no-cache",
      next: {
        tags: ["data-grid"],
      },
    }
  );
  const result = res.json();
  return result;
}

async function getState(): Promise<any> {
  return deserialize(
    cookies().get("kendo-grid")?.value || serialize(initialDataGridState)
  );
}

export default async function Page() {
  const onStateChange = async (state: KendoGridState) => {
    "use server";
    revalidateTag("data-grid");
  };

  return (
    <div>
      <h1>Data Grid!</h1>
      {/* @ts-expect-error Async Server Component */}
      <DataGrid
        getData={getData}
        getInitialData={getData}
        getState={getState}
        onStateChangeAction={onStateChange}
      />
    </div>
  );
}
