class HttpError extends Error {
  constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'Not Found ~~ 🦖') {
      super(message, 404);
  }
}

class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
      super(message, 400);
  }
}

class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
      super(message, 403);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
      super(message, 401);
  }
}

class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
      super(message, 409);
  }
}

export { NotFoundError, BadRequestError,ForbiddenError,UnauthorizedError,ConflictError };