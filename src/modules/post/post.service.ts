import { prisma } from "../../lib/prisma";
import { ICreatePost } from "./post.interface";

const createPost = async (payload: ICreatePost, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getAllPost = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return posts;
};

const getAllPostsStats = () => {};

const getMyPosts = () => {};

const getPostById = () => {};

const updatePost = () => {};

const deletePost = () => {};

export const postService = {
  createPost,
  getAllPost,
  getAllPostsStats,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
