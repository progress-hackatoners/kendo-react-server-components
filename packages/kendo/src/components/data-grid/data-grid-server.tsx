import React from "react";

import Pager from "./pager";
import DataGridHeaderCell from "./header-cell";
import DataGridBody from "./data-grid-body";

export type KendoGridState = {
  expanded: Array<string | number>;
  sort: Array<any>;
};

export type DataGridServerProps = {
  data?: any;
  getData?: any;
  state?: any;
  Row: any;
  fetchAdditionalData?: any;
};

const DataGrid = (props: DataGridServerProps) => {
  const state = props.state;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <DataGridHeaderCell style={{ width: 20 }}></DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="Id">
              ID
            </DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="CompanyName">
              Company Name
            </DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="Country">
              Country
            </DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="City">
              City
            </DataGridHeaderCell>
          </tr>
        </tbody>
      </table>
      <React.Suspense fallback={<div key={"loading"}>loading</div>}>
        {/* @ts-ignore shut up next */}
        <DataGridBody {...props} Row={props.Row} />
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
