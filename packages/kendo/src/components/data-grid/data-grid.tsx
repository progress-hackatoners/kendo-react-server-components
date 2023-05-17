import React from "react";

import DataGridServer, { DataGridServerProps } from "./data-grid-server";
import DataGridClient, { DataGridClientProps } from "./data-grid-client";

export type DataGridProps = DataGridServerProps &
  DataGridClientProps & {
    getData?: any;
    getInitialData?: any;
    getState?: any;
    onStateChangeAction?: any;
  };

let data: any;
let state: any;

async function DataGrid(props: DataGridProps) {
  const { getData, getInitialData, onStateChangeAction } = props;

  if (!state) {
    state = await props.getState();
  }

  if (!data) {
    data = await getInitialData(state);
  }

  const handleStateChange = async (newState: any) => {
    "use server";
    data = await getData(newState);
    onStateChangeAction?.(newState);
  };

  return (
    <DataGridClient state={state} onStateChange={handleStateChange}>
      <React.Suspense fallback={<div>loooading</div>}>
        {/* @ts-ignore shut up next */}
        <DataGridServer getState={props.getState} data={data} />
      </React.Suspense>
    </DataGridClient>
  );
}

export default DataGrid;
