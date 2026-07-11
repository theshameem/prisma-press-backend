import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { postService } from "./post.service";

const createPost = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const payload = req.body;

  const result = await postService.createPost(payload, userId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Post created successfully",
    data: result,
  });
});

const getAllPost = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await postService.getAllPosts(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Posts retrived successfully",
    data: result,
  });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const postId = req.params.postId;

  if (!postId) {
    throw new Error("Post Id requried In Params");
  }

  const result = await postService.getPostById(postId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post details retrived successfully",
    data: result,
  });
});

const getMyPosts = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const result = await postService.getMyPosts(userId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My posts retrived successfully",
    data: result,
  });
});

const getPostsStats = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getAllPostsStats();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post stats retrived successfully",
    data: result,
  });
});

const updatePost = catchAsync(async (req: Request, res: Response) => {
  const authorId = req.user?.id;
  const isAdmin = req.user?.role === "ADMIN";

  const postId = req.params.postId;
  const payload = req.body;

  await postService.updatePost(
    postId as string,
    payload,
    authorId as string,
    isAdmin,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post updated successfully",
    data: null,
  });
});

const deletePost = catchAsync(async (req: Request, res: Response) => {
  const authorId = req.user?.id;
  const isAdmin = req.user?.role === "ADMIN";

  const postId = req.params.postId;

  if (!postId) {
    throw new Error("Post Id requried In Params");
  }

  const result = await postService.deletePost(
    postId as string,
    authorId as string,
    isAdmin,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post deleted successfully",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPost,
  getPostsStats,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
