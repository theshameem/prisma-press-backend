import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { subscriptionController } from "./subscription.controller";

const router = Router();

/**
 * @swagger
 * /api/subscription/checkout:
 *   post:
 *     summary: Create a Stripe checkout session
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: "boolean", example: true }
 *                 message: { type: "string", example: "Checkout completed successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: Stripe checkout redirect URL
 *                       example: https://checkout.stripe.com/...
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/checkout",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  subscriptionController.createCheckoutSession,
);

export const subscriptionRoutes = router;
