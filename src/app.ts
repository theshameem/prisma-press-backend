import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import config from "./config";
import { prisma } from "./lib/prisma";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.post("/api/users/register", async (req: Request, res: Response) => {
  const { name, email, password, profilePhoto } = req.body;

  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExists) {
    return res
      .status(httpStatus.CONFLICT)
      .json({ message: "User already exists" });
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

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    data: { user },
  });
});

export default app;
