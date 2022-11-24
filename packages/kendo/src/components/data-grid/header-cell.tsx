"use client";

import * as React from "react";

import { DataContext } from "../data-grid/data-grid-client";
import { SORTING_ACTION } from "./reducer";

export type DataGridHeaderCellProps = {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  field?: string;
};

function HeaderCell({ field, children, ...other }: DataGridHeaderCellProps) {
  const [state, dispatch] = React.useContext(DataContext);

  const handleClick = React.useCallback(() => {
    if (field && dispatch) {
      dispatch({
        type: SORTING_ACTION.TOGGLE,
        payload: {
          field,
        },
      });
    }
  }, [dispatch, field]);
  const sort = state.sort.find((s) => s.field === field);

  return (
    <th {...other} style={{ ...other.style, position: 'relative' }} onClick={handleClick}>
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

HeaderCell.defaultProps = defaultProps;

export default HeaderCell;
