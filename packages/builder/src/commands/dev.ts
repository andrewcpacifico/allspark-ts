import { spawnSync } from 'child_process';

const CONFIG_PATH = './node_modules/@allspark-js/builder/config/nodemon.json';

export const command = 'dev';
export const desc = 'Run service for development';
export function handler() {
  spawnSync(
    './node_modules/.bin/nodemon',
    ['--config', CONFIG_PATH],
    { stdio: 'inherit' },
  );
};
