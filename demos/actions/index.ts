"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const serialize = (state?: Object) => {
  return JSON.stringify(state);
};

export async function setState(state: any) {
  // @ts-ignore
  await cookies().set("kendo-grid", serialize(state));
}
