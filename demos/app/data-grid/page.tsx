import { DataGrid } from "kendo";
import React from "react";

export default async function Page() {

  return (
    <div>
      <h1>Data Grid!</h1>
      <React.Suspense fallback={<div>Loading Data...!</div>}>
        {/* @ts-ignore shut up next */}
        <DataGrid total={100} />
      </React.Suspense>
    </div>
  );
}
