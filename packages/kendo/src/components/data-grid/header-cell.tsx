"use client";

import * as React from "react";

import { DataContext } from "../data-grid/data-grid-client";
import { SORTING_ACTION } from "./reducer";

export type DataGridHeaderCellProps = {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  field?: string;
};

function HeaderCell(props: DataGridHeaderCellProps) {
  const { field, children, ...other } = { ...defaultProps, ...props };

  const [state, dispatch] = React.useContext(DataContext);

  const handleClick = () => {
    if (field && dispatch) {
      dispatch({
        type: SORTING_ACTION.TOGGLE,
        payload: {
          field,
        },
      });
    }
  };
  const sort = state?.sort.find((s) => s.field === field);

  return (
    <th
      {...other}
      style={{ ...other.style, position: "relative" }}
      onClick={handleClick}
    >
      {children}
      &nbsp;
      {sort ? (
        <span
          style={{
            position: "absolute",
            left: 10,
            transform: `rotate(${sort.dir === "desc" ? "180" : "0"}deg)`,
          }}
        >
          ^
        </span>
      ) : null}
    </th>
  );
}

const defaultProps = {
  style: {},
};

export default HeaderCell;
