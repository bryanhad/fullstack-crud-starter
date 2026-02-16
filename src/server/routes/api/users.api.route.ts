import { userController } from "../../controllers/user.controller";
import { userValidation } from "../../validations/user.validation";
import { validateRequest } from "../../middlewares/validate.middleware";
import { Router } from "express";

const usersRouter: Router = Router();

// GET endpoints
usersRouter.get("/", userController.getUsers);
usersRouter.get(
   "/:userId",
   validateRequest(userValidation.getUserByIdRequest),
   userController.getUserById,
);

// POST endpoints
usersRouter.post(
   "/",
   validateRequest(userValidation.createUserRequest),
   userController.createUser,
);

export { usersRouter };
