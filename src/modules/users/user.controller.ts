import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { jwtUtils } from "../../utils/jwt";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await userService.registerUserIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: { user },
  });
});

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }

    const profile = await userService.getMyProfile(verifiedToken.id);

    console.log("verifiedToken", verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile fetched successfully",
      data: { profile },
    });
  },
);

export const userController = { registerUser, getMyProfile };
