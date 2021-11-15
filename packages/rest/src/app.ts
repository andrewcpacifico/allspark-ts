import express from 'express';

import {
  IConfigManager,
  nconfConfigManager,

  ILogger,
  pinoLogger,

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

    dependencyInjector.registerThirdPartyDependencies({
      express,
    });

    dependencyInjector.register([
      { name: 'server', dependency: ExpressServer },
      { name: 'configManager', dependency: nconfConfigManager, type: DependencyType.VALUE },
      { name: 'logger', dependency: pinoLogger, type: DependencyType.VALUE },
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

    configManager.load();
    logger.init();
    server.initialize();
  }

  async start() {
    const { server } = this.getDependencyContainer();

    server.listen();

    return server;
  }
};
