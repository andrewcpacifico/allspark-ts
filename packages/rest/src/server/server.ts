import { IncomingMessage, ServerResponse } from 'http';
import { TFailable } from '@allspark-js/core';

type Params = {
  [key: string]: any;
}

export interface Response extends ServerResponse {
  status(responseStatus: number): Response;
  sendStatus(responseStatus: number): void;
  json(data: string | object): void;
  send(): void;
}
export interface Request<
  P extends Params = any,
  B = any,
  Q extends Params = any,
  H extends Params = any,
> extends IncomingMessage {
  params: P;
  body: B;
  query: Q;
  headers: H;
}
export type NextFunction = (args?: any) => void;
export type Handler = (req: Request, res: Response, next: NextFunction) => void;
export type ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => void;

export type RouteHandler<T = any, E = undefined> =
  [E] extends [undefined] ?
    (req: Request) => Promise<T> :
    (req: Request) => Promise<TFailable<T, E>>;

export type ResponseFormatter<T = any, E = undefined> =
  [E] extends [undefined] ?
    (res: Response, data: T) => void :
    (res: Response, data: TFailable<T, E>) => void;

export interface ValidatorSchema {
  params?: object;
  query?: object;
  body?: object;
  headers?: object;
}

export type RouteHandleArgs = {
  validatorSchema?: ValidatorSchema;
  formatter: ResponseFormatter;
  handler: RouteHandler;
  middlewares?: Handler[];
  path: string;
}

export interface IRouter<T = any> {
  get(args: RouteHandleArgs): void;
  post(args: RouteHandleArgs): void;
  put(args: RouteHandleArgs): void;
  patch(args: RouteHandleArgs): void;
  delete(args: RouteHandleArgs): void;
  getInternalRouter(): T;
  route(path: string, route: IRouter): void;
}

export interface IServer {
  createRouter(): IRouter;
  initialize(): void;
  route(path: string, router: IRouter): void;
  applyMiddleware(middleware: Handler): void;
  applyErrorMiddleware(middleware: ErrorHandler): void;
  listen(): void;
}
