export interface ILogger<C = any> {
  init({ config }: {
    config?: C;
  }): void;
  info(msg: any, ...args: any[]): void;
  debug(msg: any, ...args: any[]): void;
  error(msg: any, ...args: any[]): void;
  warn(msg: any, ...args: any[]): void;
}
