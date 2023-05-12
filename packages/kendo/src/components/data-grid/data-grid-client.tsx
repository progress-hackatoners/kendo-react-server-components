"use client";

import React from "react";

import {
  DataGridAction,
  dataGridReducer,
  DataGridState,
  initialDataGridState,
} from "./reducer";

export type DataGridClientProps = {
  state?: any;
  onStateChange?: any;
  children?: React.ReactNode;
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
  const { state, onStateChange, children } = props;

  const handleStateDispatch = React.useCallback(
    (action: DataGridAction) => {
      const newState = dataGridReducer(state, action);
      onStateChange?.(newState);
    },
    [state, onStateChange]
  );

  return (
    <DataContext.Provider value={[state, handleStateDispatch]}>
      {children}
    </DataContext.Provider>
  );
}
