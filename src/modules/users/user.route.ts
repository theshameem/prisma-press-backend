import { Router } from "express";
import { Role } from "../../../generated/prisma/client";
import { auth } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.registerUser);

router.get("/me", auth(Role.AUTHOR, Role.USER), userController.getMyProfile);

router.put(
  "/my-profile",
  auth(Role.AUTHOR, Role.USER),
  userController.updateMyProfile,
);

export const userRoutes = router;
