import { spawnSync } from 'child_process';

export const command = 'compile';
export const desc = 'Compile typescript files from service';
export function handler() {
  spawnSync(
    './node_modules/.bin/ttsc',
    ['-p', 'tsconfig.build.json'],
    { stdio: 'inherit' },
  );
};
