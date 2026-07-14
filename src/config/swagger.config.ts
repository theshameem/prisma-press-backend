import swaggerJSDoc from "swagger-jsdoc";
import config from "../config";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Prisma Press API Documentation",
    version: "1.0.0",
    description:
      "REST API documentation for the Prisma Press backend (users, posts, comments, subscriptions, premium content).",
    contact: {
      name: "API Support",
    },
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}`,
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Auth", description: "Authentication and token management" },
    { name: "Users", description: "User registration and profile management" },
    { name: "Posts", description: "Posts CRUD operations" },
    { name: "Comments", description: "Comments CRUD operations" },
    { name: "Subscription", description: "Stripe subscription endpoints" },
    { name: "Premium", description: "Premium content endpoints" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT access token in the format: Bearer <token>",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          statusCode: { type: "integer", example: 400 },
          message: { type: "string", example: "Something went wrong" },
        },
      },
      Role: {
        type: "string",
        enum: ["USER", "AUTHOR", "ADMIN"],
      },
      PostStatus: {
        type: "string",
        enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      },
      IsPremium: {
        type: "string",
        enum: ["FREE", "PREMIUM"],
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          role: { $ref: "#/components/schemas/Role" },
          avatar: { type: "string", nullable: true },
          bio: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Post: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          content: { type: "string" },
          thumbnail: { type: "string", nullable: true },
          status: { $ref: "#/components/schemas/PostStatus" },
          isPremium: { $ref: "#/components/schemas/IsPremium" },
          authorId: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Comment: {
        type: "object",
        properties: {
          id: { type: "string" },
          content: { type: "string" },
          postId: { type: "string" },
          authorId: { type: "string" },
          isModerated: { type: "boolean", example: false },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/modules/**/*.route.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
