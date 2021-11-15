import expressModule, {
  Express as ExpressApp,
  Handler as ExpressHandler,
  Router,
} from 'express';
import { IConfigManager, ILogger } from '@allspark-js/core';

import {
  ErrorHandler,
  Handler,
  IRouter,
  IServer,
  NextFunction,
  Request,
  Response,
  ResponseFormatter,
  RouteHandleArgs,
  RouteHandler,
} from './server';

type Express = typeof expressModule;

type Dependencies = {
  config: IConfigManager;
  express: Express;
  logger: ILogger;
};

export default class ExpressServer implements IServer {
  private app?: ExpressApp;

  constructor(private deps: Dependencies) {}

  public getApp(): ExpressApp {
    if (!this.app) {
      throw new Error('Express server not initialized');
    }

    return this.app;
  }

  initialize() {
    const { express } = this.deps;
    this.app = express();
  }

  applyMiddleware(middleware: Handler) {
    this.getApp().use(middleware);
  }

  applyErrorMiddleware(middleware: ErrorHandler) {
    this.getApp().use(middleware);
  }

  createRouter() {
    const { express } = this.deps;
    const expressRouter = express.Router();

    const getHandler = (
      method: 'post' | 'get' | 'delete' | 'put' | 'patch',
      path: string,
      handler: RouteHandler,
      formatter: ResponseFormatter,
      middlewares: Handler[] = [],
    ): ExpressHandler => {
      const middlewaresToApply = [];
      middlewaresToApply.push(...middlewares);

      return expressRouter[method](
        path,
        ...middlewaresToApply,
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const response = await handler(req);
            formatter(res, response);
          } catch (err) {
            next(err);
          }
        },
      );
    };

    return {
      get({
        formatter,
        handler,
        path,
        middlewares,
      }: RouteHandleArgs) {
        getHandler(
          'get',
          path,
          handler,
          formatter,
          middlewares,
        );
      },

      post({
        formatter,
        handler,
        path,
        middlewares,
      }: RouteHandleArgs) {
        getHandler(
          'post',
          path,
          handler,
          formatter,
          middlewares,
        );
      },

      put({
        formatter,
        handler,
        path,
        middlewares,
      }: RouteHandleArgs) {
        getHandler(
          'put',
          path,
          handler,
          formatter,
          middlewares,
        );
      },

      patch({
        formatter,
        handler,
        path,
        middlewares,
      }: RouteHandleArgs) {
        getHandler(
          'patch',
          path,
          handler,
          formatter,
          middlewares,
        );
      },

      delete({
        formatter,
        handler,
        path,
        middlewares,
      }: RouteHandleArgs) {
        getHandler(
          'delete',
          path,
          handler,
          formatter,
          middlewares,
        );
      },

      route(path: string, router: IRouter<Router>) {
        expressRouter.use(path, router.getInternalRouter());
      },

      getInternalRouter() {
        return expressRouter;
      },
    };
  }

  listen() {
    const { config, logger } = this.deps;
    const port = config.get('restServer:port');
    const env = config.get('NODE_ENV');

    return new Promise((resolve, reject) => {
      this.getApp().listen(port, () => {
        logger.info(`Service ${env} listening on port ${port}`);
        resolve(undefined);
      }).on('error', (err: Error) => {
        logger.error('Cannot start express server', err);
        reject(err);
      });
    });
  }

  route(path: string, router: IRouter<Router>) {
    this.getApp().use(path, router.getInternalRouter());
  }
}
