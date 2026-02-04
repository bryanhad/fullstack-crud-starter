import * as userService from "@/services/user.service";
import { createApiHandler } from "@/utils/api.util";
import { NotFoundError } from "@/utils/error.util";
import {
   createUserRequestSchema,
   getUserByIdRequestSchema,
} from "@/validation/user.validation";

export const createUser = createApiHandler<typeof createUserRequestSchema>(
   async (req) => {
      await userService.createUser(req.body);
      return { message: "User created successfully." };
   },
);

export const getUserById = createApiHandler<typeof getUserByIdRequestSchema>(
   async (req) => {
      const user = await userService.getUserById(req.params.userId);
      if (!user) {
         throw new NotFoundError();
      }
      return { data: user };
   },
);

export const getUsers = createApiHandler(async () => {
   const users = await userService.getUsers();
   return { data: users };
});
