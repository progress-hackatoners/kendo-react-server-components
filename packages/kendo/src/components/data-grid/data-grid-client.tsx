"use client";

// @ts-ignore next
import React, { experimental_useOptimistic as useOptimistic } from "react";

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
  const { state: serverState, onStateChange, children } = props;
  const [state, setOptimisticState] = useOptimistic(
    serverState,
    (_: any, newSt: any) => newSt
  );

  const handleStateDispatch = async (action: DataGridAction) => {
    const newState = dataGridReducer(state, action);
    setOptimisticState(newState);
    React.startTransition(() => {
      onStateChange(newState);
    });
  };

  return (
    <DataContext.Provider value={[state, handleStateDispatch]}>
      <div>
        <React.Suspense fallback={<div>Loading</div>}>
          {children}
        </React.Suspense>
      </div>
    </DataContext.Provider>
  );
}
