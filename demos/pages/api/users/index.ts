import { SortDescriptor } from "kendo/src/components/data-grid/reducer";
import { NextApiRequest, NextApiResponse } from "next";
import store from "../../../data";
import { User } from "../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, take = "10", sort } = req.query;

  if (page) {
    const start = (Number(page) - 1) * Number(take);
    const end = start + Number(take);
    let users = store.users;

    if (sort) {
      const sortDescriptors = JSON.parse(sort as string) as SortDescriptor[];
      users = users.sort((a, b) => {
        for (const sortDescriptor of sortDescriptors) {
          const field = sortDescriptor.field as keyof User;
          const dir = sortDescriptor.dir || "asc";

          const aValue = a[field];
          const bValue = b[field];
          if (aValue < bValue) {
            return dir === "asc" ? -1 : 1;
          }
          if (aValue > bValue) {
            return dir === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
    }

    if (!isNaN(start) && !isNaN(end)) {
      users = users.slice(start, end);
    }

    /* await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000)
  ); */

    res.status(200);
    res.json(users);
  } else {
    res.status(200).json(store.users);
  }
}
