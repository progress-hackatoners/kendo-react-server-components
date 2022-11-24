"use client";
import * as React from "react";
import { DataContext } from "../data-grid/data-grid-client";
import { EXPAND_ACTION } from "../data-grid/reducer";

export default function Checkbox({ onChange, ...props }: any) {
  const [state, dispatchState] = React.useContext(DataContext);

  const handleChange = React.useCallback(
    (event: any) => {
      dispatchState?.({
        type: EXPAND_ACTION.TOGGLE,
        payload: props.id,
      });
    },
    [dispatchState, props.id]
  );

  return (
    <input
      type="checkbox"
      checked={state?.expanded?.includes(props.id)}
      onChange={handleChange}
    />
  );
}
