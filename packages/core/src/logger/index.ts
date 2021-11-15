import pino from 'pino';
import PinoLogger from './pino';

export * from './logger';
export { PinoLogger };
export const pinoLogger = new PinoLogger({ pino });
