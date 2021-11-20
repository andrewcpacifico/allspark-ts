import { spawnSync } from 'child_process';

const CONFIG_PATH = './node_modules/@allspark-js/builder/config/.eslintrc';

export const command = 'lint';
export const desc = 'Lint service\'source files.';
export function handler() {
  const { status } = spawnSync(
    './node_modules/.bin/eslint',
    ['src', '--ext', '.js,.tsx,.ts', '-c', CONFIG_PATH],
    { stdio: 'inherit' },
  );

  if (status === 0) {
    console.log('Linting done without errors');
  }
};
