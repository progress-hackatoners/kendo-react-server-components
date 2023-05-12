import { DataGridState } from "kendo/src/components/data-grid/reducer";
import { cookies } from "next/headers";

async function getData({ page = 1, take = 10, sort = [] }: any = {}) {
  const res = await fetch(
    `http://localhost:3000/api/users?page=${page}&take=${take}&sort=${JSON.stringify(
      sort
    )}`
  );
  return res.json();
}

const defaultState: DataGridState = {
  page: 1,
  take: 10,
  total: 100,
  expanded: [],
  sort: [],
};

const deserialize = (state?: string) => {
  if (state) {
    return JSON.parse(decodeURI(state));
  } else {
    return defaultState;
  }
};

export const DataSource = async (props: any) => {
  const state = deserialize(cookies().get("kendo-grid")?.value);
  const data = await getData(state);

  return (
    <props.children.type {...props.children.props} data={data} state={state} />
  );
};
