import { ILogger } from '@allspark-js/core';

import { ValidationError } from '../third-party/express-validation';
import { ErrorHandler, Response } from '../server';

type Dependencies = {
  logger: ILogger;
};

export default function errorHandlerMiddleware({
  logger,
}: Dependencies): ErrorHandler {
  function badRequestResponse(res: Response, details?: object | string) {
    res.status(400);
    res.json({
      error: {
        type: 'BAD_REQUEST',
        details,
      },
    });

    logger.error('Cannot process request', details);
  }

  function errorResponse(res: Response, err: Error) {
    logger.error('Cannot process request', err);

    res.status(500);
    res.json({
      error: {
        type: 'INTERNAL',
        message: 'Internal Server Error',
      },
    });
  }

  return (err, _req, res, _next) => {
    if (err instanceof ValidationError) {
      return badRequestResponse(res, err.details);
    }

    if (err instanceof SyntaxError) {
      return badRequestResponse(res, 'Request body is not a json');
    }

    return errorResponse(res, err);
  };
}
