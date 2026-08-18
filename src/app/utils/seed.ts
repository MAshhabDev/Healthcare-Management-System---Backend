import { Role } from "../../generated/prisma/enums";
import config from "../config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });

    if (isSuperAdminExist) {
      throw new Error("Super Admin Exist");
      return;
    }

    const name = config.super_admin_name;
    const email = config.super_admin_email;
    const password = config.super_admin_password;

    if (!name || !email || !password) {
      throw new Error("Super Admin name,email, or password missing");
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const superAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: Role.SUPER_ADMIN,
        emailVerified: true,
        needPasswordChange: false,
      },
    });

    console.log("Super Admin Created: ", superAdmin);
  } catch (error) {
    console.log("Error Seeding Super Admin :", error);

    await prisma.user.delete({
      where: {
        email: config.super_admin_email,
      },
    });
  }
};

export const testerAdmin = async () => {
  try {
    const isAdminExist = await prisma.user.findUnique({
      where: {
        email: config.admin_email,
      },
    });

    if (isAdminExist) {
      throw new Error("Admin Exist");
      return;
    }

    const name = config.admin_name;
    const email = config.admin_email;
    const password = config.admin_password;

    if (!name || !email || !password) {
      throw new Error("Admin name,email, or password missing");
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: Role.ADMIN,
        emailVerified: true,
        needPasswordChange: false,
      },
    });

    console.log("Admin Created: ", admin);
  } catch (error) {
    console.log("Error Seeding Super Admin :", error);

    await prisma.user.delete({
      where: {
        email: config.admin_email,
      },
    });
  }
};
