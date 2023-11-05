"use server";
import { revalidatePath } from "next/cache";

export async function Revalidate(path: string) {
    console.log(path);
    revalidatePath(path);
}
