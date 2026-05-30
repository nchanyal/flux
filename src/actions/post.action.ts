"use server";

import { revalidatePath } from "next/cache";
import { getDbUserId } from "./user.actions";
import { prisma } from "@/lib/prisma";

export async function createPost(content: string, imageUrl: string) {
  try {
    const userId = await getDbUserId();

    const post = await prisma.post.create({
      data: {
        content: content,
        image: imageUrl,
        authorId: userId,
      },
    });

    revalidatePath("/"); // purge the cache for the home page
    return { success: true, post: post };
  } catch (error) {
    console.log("Failed to create a post:", error);
    return { success: false, error: "Failed to create a post" };
  }
}
