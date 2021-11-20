import { spawnSync } from 'child_process';

export const command = 'compile';
export const desc = 'Compile typescript files from service';
export function handler() {
  console.log('VAI TOMÁ NO CU!!');
  spawnSync(
    './node_modules/.bin/tsc',
    ['-p', 'tsconfig.build.json'],
    { stdio: 'inherit' },
  );
};
