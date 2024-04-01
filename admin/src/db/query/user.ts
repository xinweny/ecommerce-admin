import { db } from "@/db/client";

import { UserRole } from "@prisma/client";

export const getAdminByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
        role: UserRole.admin,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getAdminById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
        role: UserRole.admin,
      },
    });

    return user;
  } catch {
    return null;
  }
};