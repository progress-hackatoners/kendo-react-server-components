import React from "react";
import { DataGridRow } from "./data-grid-row";
import DataGridMasterRow from "./master-row";

const DataGridBody = async (props: any) => {
  const state = await props.getState();
  const data = await props.getData(state);

  return (
    <div>
      <table>
        <tbody>
          {data.map((entry: any) => (
            <DataGridRow {...entry} id={entry.id} key={`row-${entry.id}`}>
              {state.expanded.includes(entry.id) && (
                <React.Suspense
                  key={`row-${entry.id}`}
                  fallback={
                    <tr>
                      <td>Loading more</td>
                    </tr>
                  }
                >
                  {/* @ts-ignore shut up next */}
                  <DataGridMasterRow
                    {...props}
                    id={entry.id}
                    url={entry.url}
                    key={`master-row-${entry.id}`}
                  />
                </React.Suspense>
              )}
            </DataGridRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGridBody;
