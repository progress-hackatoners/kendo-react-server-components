"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { DataGridServerProps } from "./data-grid-server";
import {
  DataGridAction,
  dataGridReducer,
  DataGridState,
  initialDataGridState,
} from "./reducer";

export type DataGridClientProps = DataGridServerProps & {
  children?: React.ReactNode;
};

const serialize = (state: any) => {
  return JSON.stringify(state);
};

export const DataContext = React.createContext<
  [DataGridState, (action: DataGridAction) => void]
>([
  initialDataGridState,
  (_action: DataGridAction) => {
    /* noop */
  },
]);

export default function DataGrid(props: DataGridClientProps) {
  const router = useRouter();
  const state = props.state;

  const handleStateDispatch = React.useCallback(
    (action: DataGridAction) => {
      const newState = dataGridReducer(state, action);
      document.cookie = `kendo-grid=${serialize(newState)}`;
      router.refresh();
    },
    [router, state]
  );

  return (
    <DataContext.Provider value={[state, handleStateDispatch]}>
      {props.children}
    </DataContext.Provider>
  );
}
