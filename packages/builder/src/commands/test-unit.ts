import { spawnSync } from 'child_process';
import { Argv } from 'yargs';

const CONFIG_PATH = './node_modules/@allspark-js/builder/config/.mocharc.json';

type Params = {
  dev: boolean;
};

export const command = 'test-unit';
export const desc = 'Run unit tests.';

export function builder(yargs: Argv<Params>) {
  return yargs.describe('dev', 'Watch modifications on development environment');
}

export function handler(argv: Params) {
  const args = ['--config', CONFIG_PATH, './test/unit/**/*.spec.ts'];

  if (argv.dev) {
    args.push('--watch');
  }

  spawnSync(
    './node_modules/.bin/mocha',
    args,
    { stdio: 'inherit' },
  );
};
