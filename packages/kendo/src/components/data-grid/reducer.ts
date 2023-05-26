export const initialDataGridState: DataGridState = {
  expanded: [],
  take: 10,
  page: 1,
  sort: [],
  total: 100,
};

export type DataGridState = {
  expanded?: any[];
  take: number;
  page: number;
  sort: SortDescriptor[];
  total: number;
};

export enum EXPAND_ACTION {
  TOGGLE = "EXPAND_TOGGLE",
  EXPAND = "EXPAND_EXPAND",
  COLLAPSE = "EXPAND_COLLAPSE",
}

export enum PAGING_ACTION {
  CHANGE_PAGE = "PAGING_CHANGE_PAGE",
  CHANGE_TAKE = "PAGING_CHANGE_TAKE",
}

export enum SORTING_ACTION {
  TOGGLE = "SORTING_TOGGLE",
  SORT_ASC = "SORTING_SORT_ASC",
  SORT_DESC = "SORTING_SORT_DESC",
}

export interface DataGridExpandAction {
  type: EXPAND_ACTION;
  payload: string | number;
}

export interface DataGridPagingAction {
  type: PAGING_ACTION;
  payload: number;
}

export interface DataGridSortingAction {
  type: SORTING_ACTION;
  payload: SortDescriptor;
}

export type DataGridAction =
  | DataGridExpandAction
  | DataGridPagingAction
  | DataGridSortingAction;

export type SortDescriptor = {
  field: string;
  dir?: "asc" | "desc";
};

export const dataGridReducer = (
  state: DataGridState = initialDataGridState,
  action: DataGridAction
): DataGridState => {
  switch (action.type) {
    case EXPAND_ACTION.EXPAND:
      return {
        ...state,
        expanded: state.expanded?.includes(action.payload)
          ? state.expanded
          : [...(state.expanded || []), action.payload],
      };
    case EXPAND_ACTION.COLLAPSE:
      return {
        ...state,
        expanded: state.expanded?.filter((item) => item !== action.payload),
      };
    case EXPAND_ACTION.TOGGLE:
      return {
        ...state,
        expanded: state?.expanded?.includes(action.payload)
          ? state.expanded.filter((item) => item !== action.payload)
          : [...(state.expanded || []), action.payload],
      };
    case PAGING_ACTION.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case PAGING_ACTION.CHANGE_TAKE:
      return {
        ...state,
        take: action.payload,
      };
    case SORTING_ACTION.TOGGLE:
      return {
        ...state,
        sort: state.sort?.find((item) => item.field === action.payload.field)
          ? state.sort?.map((item) =>
              item.field === action.payload.field
                ? {
                    ...item,
                    dir: item.dir === "asc" ? "desc" : "asc",
                  }
                : item
            )
          : [
              {
                ...action.payload,
                dir: action.payload.dir || "asc",
              },
            ],
      };
    default:
      return state;
  }
};
