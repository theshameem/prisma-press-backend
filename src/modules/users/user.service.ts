import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./user.interface";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
  {
    const { name, email, password, profilePhoto } = payload;

    const isUserExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserExists) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await prisma.profile.create({
      data: {
        userId: createUser.id,
        profilePhoto,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: createUser.id,
        email: createUser.email,
      },
      omit: {
        password: true,
      },
      include: {
        profile: true,
      },
    });

    return user;
  }
};

export const userService = { registerUserIntoDB };
