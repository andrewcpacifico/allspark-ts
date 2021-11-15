import nconf from 'nconf';
import NconfConfigManager from './nconf';

export * from './config-manager';
export { NconfConfigManager };
export const nconfConfigManager = new NconfConfigManager({ process, nconf });
