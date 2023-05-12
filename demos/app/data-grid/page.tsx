import React from "react";

import { DataGrid } from "kendo";
import { DataSource } from "../../components/data-source";
import { DataState } from "../../components/data-state";

export default async function Page() {
  return (
    <div>
      <h1>Data Grid!</h1>
      <React.Suspense fallback={<div>Loading Data...!</div>}>
        {/* @ts-ignore shut up next */}
        <DataGrid DataSource={<DataSource />} DataState={<DataState />} />
      </React.Suspense>
    </div>
  );
}
