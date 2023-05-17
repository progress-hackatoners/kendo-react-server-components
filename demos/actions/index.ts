"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const serialize = (state?: Object) => {
  return JSON.stringify(state);
};

export async function setState(state: any) {
  console.log("setting State");
  // @ts-ignore
  await cookies().set("kendo-grid", serialize(state));
  await revalidateTag("data-grid");

  console.log("setting Complete");
}
