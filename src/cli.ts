import { Arg, collect, Flag, Help, KWArg, Program } from 'jargs';

import { PROGRAM } from './constants';
import start from './start';

const START_EXAMPLES = [
  `${PROGRAM}`,
  `${PROGRAM} web watch-js watch-less`,
  `${PROGRAM} -x worker -x scheduler`,
];

collect(
  Help(
    'help',
    {
      alias: 'h',
    },
    Program(
      'crabs',
      {
        description: 'Run multiple crab processes with a single command',
        usage: `${PROGRAM} [processes/excludes]`,
        examples: START_EXAMPLES,
        callback: start,
      },
      Flag('version', {
        description: 'Display current version number',
        alias: 'v',
      }),
      Arg('process', {
        description: 'Process(es) to run',
        multi: true,
      }),
      KWArg('exclude', {
        alias: 'x',
        description: 'Process(es) to exclude',
        multi: true,
      })
    )
  ),
  process.argv
);
