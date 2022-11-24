import DataGridServer, {
  DataGridServerProps,
} from "./data-grid-server";
import DataGridClient, { DataGridClientProps } from "./data-grid-client";
import { cookies } from "next/headers";
import { DataGridState } from "./reducer";

export type DataGridProps = DataGridServerProps & DataGridClientProps & {};

export const deserialize = (state?: string) => {
  if (state) {
    return JSON.parse(decodeURI(state));
  } else {
    return {};
  }
};

const defaultState: DataGridState = {
  page: 1,
  take: 10,
  expanded: [],
  sort: [],
};

export default async function DataGrid(props: DataGridProps) {
  const stateStr = cookies().get("kendo-grid")?.value || "";
  const state = deserialize(stateStr);

  return (
    <>
      <DataGridClient  {...props} state={{ ...defaultState, ...state }}>
        {/* @ts-ignore shut up next */}
        <DataGridServer {...props} state={{ ...defaultState, ...state }} />
      </DataGridClient>
    </>
  );
}
