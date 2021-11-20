import { usage } from 'yargs';

usage('\nUsage: allspark-builder <cmd> [args]')
  .commandDir('./commands')
  .demandCommand(4, 'Please specify a command')
  .help('h')
  .alias('h', 'help')
  .argv;
