import React from "react";

import DataGridServer, { DataGridServerProps } from "./data-grid-server";
import DataGridClient, { DataGridClientProps } from "./data-grid-client";

export type DataGridProps = DataGridServerProps &
  DataGridClientProps & {
    getData?: any;
    getInitialData?: any;
    getState?: any;
    onStateChangeAction?: any;
    fetchAdditionalData?: any;
  };

async function DataGrid(props: DataGridProps) {
  const { getData, getState, onStateChangeAction } = props;
  const state = await getState();

  return (
    <DataGridClient state={state} onStateChange={onStateChangeAction} >
      {/* @ts-ignore shut up next */}
      <DataGridServer
        getState={getState}
        getData={getData}
        fetchAdditionalData={props.fetchAdditionalData}
      />
    </DataGridClient>
  );
}

export default DataGrid;
