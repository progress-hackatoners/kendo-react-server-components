import { reject } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import store from "../../../data";
import { User } from "../../../models";

type ResponseError = {
  message: string;
};

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) {
  const { query } = req;
  const { id } = query;
  const filtered = store.users.filter((p) => p.id === id);

  /* await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  ); */

  return filtered.length > 0
    ? res.status(200).json(filtered[0])
    : res.status(404).json({ message: `User with id: ${id} not found.` });
}
