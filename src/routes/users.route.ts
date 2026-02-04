import * as userController from "@/controller/user.controller";
import * as validationSchema from "@/validation/user.validation";
import { validateRequest } from "@/middlewares/validate.middleware";
import { Router } from "express";

const usersRouter: Router = Router();

// GET endpoints
usersRouter.get("/", userController.getUsers);
usersRouter.get(
   "/:userId",
   validateRequest(validationSchema.getUserByIdRequestSchema),
   userController.getUserById,
);

// POST endpoints
usersRouter.post(
   "/",
   validateRequest(validationSchema.createUserRequestSchema),
   userController.createUser,
);

export { usersRouter };
