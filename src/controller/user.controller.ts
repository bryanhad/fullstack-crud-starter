import { UserService } from "@/services/user.service";
import { createApiHandler } from "@/utils/api.util";
import { NotFoundError } from "@/utils/error.util";
import {
   createUserRequestSchema,
   getUserByIdRequestSchema,
} from "@/validation/user.validation";

export class UserController {
   public static readonly createUser = createApiHandler<typeof createUserRequestSchema>(
      async (req) => {
         await UserService.createUser(req.body);
         return { message: "User created successfully." };
      },
   );

   public static readonly getUserById = createApiHandler<typeof getUserByIdRequestSchema>(
      async (req) => {
         const user = await UserService.getUserById(req.params.userId);
         if (!user) {
            throw new NotFoundError();
         }
         return { data: user };
      },
   );

   public static readonly getUsers = createApiHandler(async () => {
      const users = await UserService.getUsers();
      return { data: users };
   });
}
