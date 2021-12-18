import {
  IConfigManager,
  nconfConfigManager,

  IMongoManager,
  mongoManager,

  ILogger,
  pinoLogger,

  failableFactory,

  AwilixDependencyInjector,
  DependencyType,
} from '@allspark-js/core';

import {
  bodyParserMiddleware,
  errorHandlerMiddleware,
  prometheusMetricsMiddleware,

  TMetricsMiddlewareCreator
} from './middlewares';
import {
  ErrorHandler,
  ExpressServer,
  Handler,
  IServer,
} from './server';
import { thirdPartyDependencies } from './third-party';

export type TDependencyContainer = {
  bodyParserMiddleware: Handler;
  configManager: IConfigManager;
  errorHandlerMiddleware: ErrorHandler;
  logger: ILogger;
  middlewares: Handler[];
  mongoManager: IMongoManager;
  prometheusMetricsMiddleware: TMetricsMiddlewareCreator;
  server: IServer;
};

export default class App<T> {
  private dependencyContainer: TDependencyContainer & T | undefined;

  private getDependencyContainer(): TDependencyContainer & T {
    if (!this.dependencyContainer) {
      throw new Error('Container not initialized');
    }

    return this.dependencyContainer;
  }

  applyMiddlewares() {
    const {
      bodyParserMiddleware,
      middlewares,
      prometheusMetricsMiddleware,
      server,
    } = this.getDependencyContainer();

    prometheusMetricsMiddleware((server as ExpressServer).getApp());
    server.applyMiddleware(bodyParserMiddleware);
    middlewares.forEach(server.applyMiddleware.bind(server));
  }

  registerDependencies() {
    const srcPath = process.env.NODE_ENV === 'staging' ||
      process.env.NODE_ENV === 'production' ? 'dist' : 'src';

    const dependencyInjector = new AwilixDependencyInjector<TDependencyContainer & T>({
      srcPath,
    });
    this.dependencyContainer = dependencyInjector.initialize();

    dependencyInjector.registerThirdPartyDependencies(thirdPartyDependencies);

    dependencyInjector.register([
      { name: 'bodyParserMiddleware', dependency: bodyParserMiddleware },
      { name: 'configManager', dependency: nconfConfigManager, type: DependencyType.VALUE },
      { name: 'errorHandlerMiddleware', dependency: errorHandlerMiddleware },
      { name: 'failableFactory', dependency: failableFactory, type: DependencyType.VALUE },
      { name: 'logger', dependency: pinoLogger, type: DependencyType.VALUE },
      { name: 'mongoManager', dependency: mongoManager, type: DependencyType.VALUE },
      { name: 'prometheusMetricsMiddleware', dependency: prometheusMetricsMiddleware },
      { name: 'server', dependency: ExpressServer },
    ]);

    dependencyInjector.loadModules({ path: 'domain/actions', suffix: 'action' });
    dependencyInjector.loadModules({ path: 'domain/clients', suffix: 'client' });
    dependencyInjector.loadModules({ path: 'domain/managers', suffix: 'manager', index: 'managers' });
    dependencyInjector.loadModules({ path: 'domain/repositories', suffix: 'repository' });
    dependencyInjector.loadModules({ path: 'domain/services', suffix: 'service' });

    dependencyInjector.loadModules({ path: 'rest/controllers', suffix: 'controller' });
    dependencyInjector.loadModules({ path: 'rest/formatters', suffix: 'formatter' });
    dependencyInjector.loadModules({ path: 'rest/handlers', suffix: 'handler' });
    dependencyInjector.loadModules({ path: 'rest/middlewares', suffix: 'middleware', index: 'middlewares' });
    dependencyInjector.loadModules({ path: 'rest/routers', suffix: 'router' });
    dependencyInjector.loadModules({ path: 'rest/validators', suffix: 'validator' });

    return this.dependencyContainer;
  }

  async initialize(): Promise<TDependencyContainer & T> {
    const container = this.getDependencyContainer();
    const {
      configManager,
      logger,
      mongoManager,
      server,
    } = container;

    configManager.load();
    logger.init({
      config: configManager.get('logger'),
    });
    await mongoManager.connect();
    server.initialize();

    this.applyMiddlewares();

    return container;
  }

  async start() {
    const { errorHandlerMiddleware, server } = this.getDependencyContainer();

    server.applyErrorMiddleware(errorHandlerMiddleware);
    server.listen();

    return server;
  }
};
