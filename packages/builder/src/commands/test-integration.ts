import { spawnSync } from 'child_process';

const CONFIG_PATH = './node_modules/@allspark-js/builder/config/.mocharc.json';

export const command = 'test-integration';
export const desc = 'Run integration tests.';

export function handler() {
  const args = ['--config', CONFIG_PATH, '--timeout', '10000', './test/integration/**/*.ts', '--exit'];

  spawnSync(
    './node_modules/.bin/mocha',
    args,
    { stdio: 'inherit' },
  );
};
