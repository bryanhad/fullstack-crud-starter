export class HttpError extends Error {
   public readonly statusCode: number;

   constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;

      /**
       * Fixes the prototype chain when extending `Error`.
       *
       * Without this, `instanceof` checks (e.g. `err instanceof NotFoundError`)
       * may fail in some runtimes (older Node, ts-node, Babel).
       * This ensures that the error instance is recognized as the correct subclass.
       */
      Object.setPrototypeOf(this, new.target.prototype);
   }
}

export class NotFoundError extends HttpError {
   constructor(message = "Not Found") {
      super(message, 404);
   }
}

export class UnauthorizedError extends HttpError {
   constructor(message = "Unauthorized") {
      super(message, 401);
   }
}

export class BadRequestError extends HttpError {
   constructor(message = "Bad request") {
      super(message, 400);
   }
}
