import { validationResult } from 'express-validator';
import env from '../config/env.js';

const errorHandler = (err, req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: validationErrors.array(),
    });
  }

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (env.DEBUG_MODE === 'true') {
    console.error(`[${new Date().toISOString()}] ${err.name}: ${message}`, {
      stack: err.stack,
      path: req.originalUrl,
      method: req.method,
    });
  }

  switch (err.name) {
    case 'ValidationError':
      return res.status(400).json({
        status: 'error',
        message: 'Invalid input data',
        errors: Object.values(err.errors).map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });

    case 'MongoServerError':
      if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
          status: 'error',
          message: `Duplicate value for ${field}`,
          errors: [{ field, value: err.keyValue[field] }],
        });
      }
      return res.status(500).json({
        status: 'error',
        message: 'Database error',
        errors: [{ message }],
      });

    case 'StellarError':
      return res.status(400).json({
        status: 'error',
        message: 'Stellar operation failed',
        errors: [{ message: err.cause || message }],
      });

    case 'UnauthorizedError':
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed',
        errors: [{ message }],
      });

    default:
      return res.status(statusCode).json({
        status: 'error',
        message,
        errors: [{ message }],
      });
  }

};

export default errorHandler;
