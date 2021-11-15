import {
  IConfigManager,
  NconfConfigManager,

  ILogger,
  PinoLogger,

  failableFactory,

  AwilixDependencyInjector,
  DependencyType,
} from '@allspark-js/core';

import {
  ErrorHandler,
  ExpressServer,
  Handler,
  IServer,
} from './server';

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

  registerDependencies() {
    const dependencyInjector = new AwilixDependencyInjector<TDependencyContainer>();
    this.dependencyContainer = dependencyInjector.initialize();

    dependencyInjector.register([
      { name: 'server', dependency: ExpressServer },
      { name: 'configManager', dependency: NconfConfigManager },
      { name: 'logger', dependency: PinoLogger },
      { name: 'failableFactory', dependency: failableFactory, type: DependencyType.VALUE },
    ]);

    return this.dependencyContainer;
  }

  async initialize() {
    const {
      configManager,
      logger,
      server,
    } = this.getDependencyContainer();

    configManager.load({ path: '/foo/bar' });
    logger.init();
    server.initialize();
  }

  async start() {
    const { server } = this.getDependencyContainer();

    server.listen();

    return server;
  }
};
