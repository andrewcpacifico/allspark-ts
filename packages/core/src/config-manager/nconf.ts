import nconfModule from 'nconf';

import { IConfigManager } from './config-manager';

type Nconf = typeof nconfModule;
type TDependencies = {
  nconf: Nconf;
  process: NodeJS.Process;
}

export default class NconfConfigManager implements IConfigManager {
  constructor(private deps: TDependencies) {}

  public load({ path = './config' } = {}) {
    const { process, nconf } = this.deps;
    const { env } = process;
    env.NODE_ENV = env.NODE_ENV || 'development';

    nconf.env().file('environment', {
      file: `${path}/${process.env.NODE_ENV}.json`,
    }).file('default', {
      file: `${path}/default.json`,
    });
  }

  public get(prop: string): any {
    const { nconf } = this.deps;
    return nconf.get(prop);
  }
}
