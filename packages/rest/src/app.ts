import {
  IConfigManager,
  nconfConfigManager,

  ILogger,
  pinoLogger,

  failableFactory,

  AwilixDependencyInjector,
  DependencyType,
} from '@allspark-js/core';

import { bodyParserMiddleware, errorHandlerMiddleware } from './middlewares';
import {
  ErrorHandler,
  ExpressServer,
  Handler,
  IServer,
} from './server';
import { thirdPartyDependencies } from './third-party';

type TDependencyContainer = {
  bodyParserMiddleware: Handler;
  errorHandlerMiddleware: ErrorHandler;
  middlewares: Handler[];
  configManager: IConfigManager;
  logger: ILogger;
  server: IServer;
};

export default class App {
  private dependencyContainer: TDependencyContainer | undefined;

  private getDependencyContainer(): TDependencyContainer {
    if (!this.dependencyContainer) {
      throw new Error('Container not initialized');
    }

    return this.dependencyContainer;
  }

  applyMiddlewares() {
    const {
      bodyParserMiddleware,
      middlewares,
      server,
    } = this.getDependencyContainer();

    server.applyMiddleware(bodyParserMiddleware);
    middlewares.forEach(server.applyMiddleware.bind(server));
  }

  registerDependencies() {
    const srcPath = process.env.NODE_ENV === 'staging' ||
      process.env.NODE_ENV === 'production' ? 'dist' : 'src';

    const dependencyInjector = new AwilixDependencyInjector<TDependencyContainer>({
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
      { name: 'server', dependency: ExpressServer },
    ]);

    dependencyInjector.loadModules({ path: 'domain/actions', suffix: 'action' });
    dependencyInjector.loadModules({ path: 'domain/clients', suffix: 'client' });
    dependencyInjector.loadModules({ path: 'domain/managers', suffix: 'manager', index: 'managers' });
    dependencyInjector.loadModules({ path: 'domain/repositories', suffix: 'repository' });
    dependencyInjector.loadModules({ path: 'domain/services', suffix: 'service' });

    dependencyInjector.loadModules({ path: 'rest/formatters', suffix: 'formatter' });
    dependencyInjector.loadModules({ path: 'rest/handlers', suffix: 'handler' });
    dependencyInjector.loadModules({ path: 'rest/middlewares', suffix: 'middleware', index: 'middlewares' });
    dependencyInjector.loadModules({ path: 'rest/routers', suffix: 'router' });
    dependencyInjector.loadModules({ path: 'rest/validators', suffix: 'validator' });

    return this.dependencyContainer;
  }

  async initialize(cb: Function) {
    const container = this.getDependencyContainer();
    const {
      configManager,
      logger,
      server,
    } = container;

    configManager.load();
    logger.init({
      config: configManager.get('logger'),
    });
    server.initialize();

    this.applyMiddlewares();

    cb(container);
  }

  async start() {
    const { errorHandlerMiddleware, server } = this.getDependencyContainer();

    server.applyErrorMiddleware(errorHandlerMiddleware);
    server.listen();

    return server;
  }
};
