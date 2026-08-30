export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const sendSuccess = (res, data, statusCode = 200, meta = {}) => {
  res.status(statusCode).json({
    success: true,
    data,
    ...meta,
  });
};

export const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
