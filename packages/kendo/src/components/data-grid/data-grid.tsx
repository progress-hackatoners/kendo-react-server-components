import React from "react";

import DataGridServer, { DataGridServerProps } from "./data-grid-server";
import DataGridClient, { DataGridClientProps } from "./data-grid-client";

export type DataGridProps = DataGridServerProps &
  DataGridClientProps & {
    DataSource?: any;
    DataState?: any;
  };

async function DataGrid(props: DataGridProps) {
  return (
    <props.DataState.type state={props.state}>
      <DataGridClient state={props.state}>
        {/* @ts-ignore shut up next */}
        <DataGridServer state={props.state} data={props.data} />
      </DataGridClient>
    </props.DataState.type>
  );
}

// eslint-disable-next-line react/display-name
const withDataSource = (Component: any) => (props: any) => {
  const { DataSource, ...other } = props;

  return (
    <DataSource.type>
      <Component {...other} />
    </DataSource.type>
  );
};

export default withDataSource(DataGrid);
