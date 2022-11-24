"use client";
import * as React from "react";
import { DataContext } from "../data-grid/data-grid-client";
import { PAGING_ACTION } from "./reducer";

export interface PageProps {
  total?: number;
  page?: number;
}

export default function Pager(props: PageProps) {
  const [state, dispatchState] = React.useContext(DataContext);
  const page = React.useDeferredValue<number>(state.page || 1);
  const take = React.useDeferredValue<number>(state.take || 1);
  const total = React.useDeferredValue<number | undefined>(props.total || 1);

  const handlePageChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatchState?.({
        type: PAGING_ACTION.CHANGE_PAGE,
        payload: Number(event.target.value),
      });
    },
    [dispatchState]
  );

  const handleTakeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatchState?.({
        type: PAGING_ACTION.CHANGE_TAKE,
        payload: Number(event.target.value),
      });
    },
    [dispatchState]
  );

  let pages = [];

  for (let i = 1; i <= ((total || 1) / take); i++) {
    pages.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div style={{display: 'flex'}}>
      <label>
        Page
        <select onChange={handlePageChange} value={page}>
          {pages}
        </select>
      </label>
      &nbsp;
      <label>
        Take
        <select onChange={handleTakeChange} value={take}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
    </div>
  );
}
