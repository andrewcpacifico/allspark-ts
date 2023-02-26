import { spawnSync } from 'child_process';

const CONFIG_PATH = './node_modules/@allspark-js/builder/config/jest.config.integration.js';

export const command = 'test-integration';
export const desc = 'Run integration tests.';

export function handler() {
  const args = ['-c', CONFIG_PATH, '--detectOpenHandles'];

  const { status } = spawnSync(
    './node_modules/.bin/jest',
    args,
    { stdio: 'inherit' },
  );

  process.exit(status || undefined);
};
