import mongoModule, { MongoClient } from 'mongodb';

import { IConfigManager } from '../config-manager';
import { ILogger } from '../logger';

type MongoModule = typeof mongoModule;

type TDependencies = {
  configManager: IConfigManager;
  logger: ILogger;
  mongo: MongoModule;
};

export interface IMongoManager {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): MongoClient;
}

export default class DefaultMongoManager implements IMongoManager {
  private mongoClient!: MongoClient;

  constructor(private deps: TDependencies) {}

  public async connect() {
    const { configManager, logger, mongo } = this.deps;
    const { host, database } = configManager.get('mongo');

    const url = `mongodb://${host}/${database}`;

    logger.info(`Connecting do mongo database. ${url}`);
    try {
      this.mongoClient = await mongo.MongoClient.connect(url);
      logger.info('Mongo connection stablished');
    } catch (err) {
      logger.error('Error connecting to mongo.');
      throw err;
    }
  }

  public disconnect(): Promise<void> {
    return this.mongoClient.close();
  }

  public getClient(): MongoClient {
    return this.mongoClient;
  }
}
