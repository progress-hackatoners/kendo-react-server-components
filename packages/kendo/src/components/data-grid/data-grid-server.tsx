import React from "react";
import { Checkbox } from "../inputs";
import DataGridMasterRow from "./master-row";
import DataGridHeaderCell from "./header-cell";
import { DataGridState } from "./reducer";
import Pager from "./pager";

export type KendoGridState = {
  expanded: Array<string | number>;
};

async function getData({ page = 1, take = 10, sort = [] }: DataGridState) {
  const res = await fetch(
    `http://localhost:3000/api/users?page=${page}&take=${take}&sort=${JSON.stringify(sort)}`
  );
  return res.json();
}

export type DataGridServerProps = {
  state: DataGridState;
  total?: number;
};

export default async function DataGrid(props: DataGridServerProps) {
  const state: DataGridState = props?.state;
  let data = await getData(state);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <DataGridHeaderCell style={{ width: 20 }}></DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="name">Name</DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="jobTitle">
              Job Title
            </DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="company">
              Company
            </DataGridHeaderCell>
            <DataGridHeaderCell style={{ width: 200 }} field="city">City</DataGridHeaderCell>
          </tr>
        </tbody>
      </table>
      <div>
        <table>
          <tbody>
            {data.map((entry: any) => (
              <React.Fragment key={entry.id}>
                <tr style={{ height: 40 }}>
                  <td style={{ width: 20 }}>
                    <Checkbox id={entry.id} />
                  </td>
                  <td style={{ width: 200 }}>{entry.name}</td>
                  <td style={{ width: 200 }}>{entry.jobTitle}</td>
                  <td style={{ width: 200 }}>{entry.company}</td>
                  <td style={{ width: 200 }}>{entry.city}</td>
                </tr>
                {state?.expanded?.includes(entry.id) && (
                  <React.Fragment key={entry.id}>
                    <React.Suspense
                      fallback={
                        <tr>
                          <td colSpan={4}>
                            <div>Loooading...</div>
                          </td>
                        </tr>
                      }
                      key={`${entry.id}-master`}
                    >
                      {/* @ts-ignore shut up next */}
                      <DataGridMasterRow
                        id={entry.id}
                        key={entry.id}
                      ></DataGridMasterRow>
                    </React.Suspense>
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td style={{ width: 20 }}>
                <Pager page={state.page} total={props.total} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
