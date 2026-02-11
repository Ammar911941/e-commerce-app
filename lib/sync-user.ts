import { getUserById } from "@/service/users";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export async function syncUser() {
  try {
    const user = await currentUser();

    if (!user) return null;

    const dbUser = await getUserById(user.id);

    const userRole = user.publicMetadata.role as string;

    if (!dbUser) {
      return await db.user.create({
        data: {
          name: user.firstName ?? "UnKnowen",
          email: user.emailAddresses[0].emailAddress,
          clerkId: user.id,
          role: userRole ?? "user",
        },
      });
    }

    await db.user.update({
      where: { clerkId: user.id },
      data: { role: userRole ?? "user" },
    });
    return dbUser;
  } catch {
    console.log("error");
  }
}
// This function return promise only because async when you call it you should call await before it
