import pinoModule, { P } from 'pino';

import { ILogger } from './logger';

type Pino = typeof pinoModule;

type TDependencies = {
  pino: Pino;
};

export default class PinoLogger implements ILogger {
  private logger: P.Logger | undefined;

  constructor(private deps: TDependencies) { }

  private getLogger(): P.Logger {
    if (!this.logger) {
      throw new Error('Logger not initialized');
    }

    return this.logger;
  }

  init(): void {
    const { pino } = this.deps;
    this.logger = pino({});
  }

  info(msg: any, ...args: any[]): void {
    this.getLogger().info(msg, ...args);
  }

  debug(msg: any, ...args: any[]): void {
    this.getLogger().debug(msg, ...args);
  }

  warn(msg: any, ...args: any[]): void {
    this.getLogger().warn(msg, ...args);
  }

  error(msg: any, ...args: any[]): void {
    this.getLogger().error(msg, ...args);
  }
}
