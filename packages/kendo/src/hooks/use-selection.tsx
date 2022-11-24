import * as React from "react";

export enum SELECTION_ACTION_TYPE {
  select = "select",
  toggle = "toggle",
  override = "override",
}

export const SelectionContext = React.createContext<any>(null);
export type SelectionAction = {
  type: SELECTION_ACTION_TYPE;
  payload: any;
};

const selectionReducer = (state: unknown, action: SelectionAction) => {
  switch (action.type) {
    case SELECTION_ACTION_TYPE.toggle:
      if (Array.isArray(state)) {
        if (state.find((s) => s === action.payload)) {
          return [...state.filter((s) => s !== action.payload)];
        } else {
          return [...state, action.payload];
        }
      } else {
        if (state === action.payload) {
          return null;
        } else {
          return action.payload;
        }
      }
    case SELECTION_ACTION_TYPE.select:
      return Array.isArray(state) ? [action.payload] : action.payload;
    case SELECTION_ACTION_TYPE.override:
      return action.payload;
    default:
      return state;
  }
};

export const useSelection = <T,>(
  defaultSelection?: T
): [T, (action: SelectionAction) => void] => {
  const [selection, dispatchSelection] = React.useReducer(
    selectionReducer,
    defaultSelection
  );
  return [selection, dispatchSelection];
};
