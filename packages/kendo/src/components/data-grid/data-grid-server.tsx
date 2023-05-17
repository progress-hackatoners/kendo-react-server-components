import React from "react";

import Pager from "./pager";
import { DataGridRow } from "./data-grid-row";
import DataGridHeaderCell from "./header-cell";
import DataGridBody from "./data-grid-body";

export type KendoGridState = {
  expanded: Array<string | number>;
  sort: Array<any>;
};

export type DataGridServerProps = {
  getState: any;
  getData: any;
  Row: any;
};

const DataGrid = async (props: DataGridServerProps) => {
  const state = (await props.getState?.()) || {};

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <DataGridHeaderCell style={{ width: 20 }}></DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="name">
              Name
            </DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="jobTitle">
              Job Title
            </DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="company">
              Company
            </DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="city">
              City
            </DataGridHeaderCell>
          </tr>
        </tbody>
      </table>
      <React.Suspense fallback={<div>loading</div>}>
        {/* @ts-ignore shut up next */}
        <DataGridBody {...props} />
      </React.Suspense>
      <div>
        <table>
          <tbody>
            <tr>
              <td style={{ width: 20 }}>
                <Pager page={state.page} total={state.total} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataGrid;
