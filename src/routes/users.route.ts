import { UserController } from "@/controller/user.controller";
import { validateRequest } from "@/middlewares/validate.middleware";
import {
   createUserRequestSchema,
   getUserByIdRequestSchema,
} from "@/validation/user.validation";
import { Router } from "express";

const usersRouter: Router = Router();

// GET endpoints
usersRouter.get("/", UserController.getUsers);
usersRouter.get(
   "/:userId",
   validateRequest(getUserByIdRequestSchema),
   UserController.getUserById,
);

// POST endpoints
usersRouter.post(
   "/",
   validateRequest(createUserRequestSchema),
   UserController.createUser,
);

export { usersRouter };
