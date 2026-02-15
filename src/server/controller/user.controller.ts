import { userService } from "../services/user.service";
import { createApiHandler } from "../utils/api.util";
import { NotFoundError } from "../utils/error.util";
import { userValidation } from "../validation/user.validation";

export const userController = {
   createUser: createApiHandler<typeof userValidation.createUserRequest>(async (req) => {
      await userService.createUser(req.body);
      return { message: "User created successfully." };
   }),

   getUserById: createApiHandler<typeof userValidation.getUserByIdRequest>(
      async (req) => {
         const user = await userService.getUserById(req.params.userId);
         if (!user) {
            throw new NotFoundError();
         }
         return { data: user };
      },
   ),

   getUsers: createApiHandler(async () => {
      const users = await userService.getUsers();
      return { data: users };
   }),
};
