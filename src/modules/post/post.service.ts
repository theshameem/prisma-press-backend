import { prisma } from "../../lib/prisma";
import { ICreatePost, IUpdatePostPayload } from "./post.interface";

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

const getPostById = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },

    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return updatedPost;
};

const getMyPosts = async (userId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts;
};

const getAllPostsStats = async () => {};

const updatePost = async (
  postId: string,
  payload: IUpdatePostPayload,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId != authorId) {
    throw new Error("You are not the owner of this post!");
  }

  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: payload,
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return result;
};

const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId != authorId) {
    throw new Error("You are not the owner of this post!");
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
};

export const postService = {
  createPost,
  getAllPost,
  getAllPostsStats,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
