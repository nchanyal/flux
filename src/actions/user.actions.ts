"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Sync the user data from Clerk to the database
 */
export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    // Quit the function if the user does not exist in Clerk
    if (!userId || !user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0], // john@email.com -> john
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}
