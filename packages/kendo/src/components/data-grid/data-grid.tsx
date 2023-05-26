import React from "react";

import DataGridServer, { DataGridServerProps } from "./data-grid-server";
import DataGridClient, { DataGridClientProps } from "./data-grid-client";
import { StateContext } from "../../context/state";

export type DataGridProps = DataGridServerProps &
  DataGridClientProps & {
    data?: any;
    getData?: any;
    state?: any;
    onStateChangeAction?: any;
    Row?: any;
  };

function DataGrid(props: DataGridProps) {
  const { getData, state, data, onStateChangeAction } = props;

  return (
    <StateContext.Provider value={state}>
      <DataGridClient state={state} onStateChange={onStateChangeAction}>
        {/* @ts-ignore shut up next */}
        <DataGridServer
          state={state}
          data={data}
          getData={getData}
          Row={props.Row}
        />
      </DataGridClient>
    </StateContext.Provider>
  );
}

export default DataGrid;
