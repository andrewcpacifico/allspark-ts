import mongo from 'mongodb';

import { nconfConfigManager } from '../config-manager';
import { pinoLogger } from '../logger';
import MongoManager from './mongo-manager';

export * from './mongo-manager';
export { MongoManager };
export const mongoManager = new MongoManager({
  configManager: nconfConfigManager,
  logger: pinoLogger,
  mongo,
})
