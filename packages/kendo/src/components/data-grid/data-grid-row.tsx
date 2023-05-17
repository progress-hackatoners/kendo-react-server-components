"use client";
import React from "react";
import { Checkbox } from "../inputs";
import { DataContext } from "./data-grid-client";

export const DataGridRow = (props: any) => {
  const [state] = React.useContext(DataContext);

  return (
    <>
      <tr style={{ height: 40 }}>
        <td style={{ width: 20 }}>
          <Checkbox id={props.id} />
        </td>
        <td style={{ width: 200 }}>{props.name}</td>
        <td style={{ width: 200 }}>{props.jobTitle}</td>
        <td style={{ width: 200 }}>{props.company}</td>
        <td style={{ width: 200 }}>{props.city}</td>
      </tr>
      {state.expanded?.includes?.(props.id) && (
        <React.Suspense
          fallback={
            <tr>
              <td>Incoming...!</td>
            </tr>
          }
        >
          {props.children}
        </React.Suspense>
      )}
    </>
  );
};
