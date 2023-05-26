"use client";

import React from "react";

import { DataGrid } from "kendo";
import { KendoGridState } from "kendo/src/components/data-grid/data-grid-server";

import { initialDataGridState } from "kendo/src/components/data-grid/reducer";
import { MasterRow } from "../../src/components/master-row.client";

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

export default function Page() {
  const [state, setState] = React.useState<any>(initialDataGridState);
  const [data, setData] = React.useState<any>([]);
  const deferredData = React.useDeferredValue(data);

  const onStateChange = async (state: KendoGridState) => {
    React.startTransition(() => {
      setState(state);
    });
    const newData = await getData(state);
    setData(newData);
  };

  React.useEffect(() => {
    getData(state).then(setData);
  }, []);

  return (
    <div>
      <h1>Client DataGrid!</h1>
      <DataGrid
        state={state}
        data={deferredData}
        onStateChangeAction={onStateChange}
        Row={MasterRow}
      />
    </div>
  );
}
