import { Arg, collect, Help, KWArg, Program } from 'jargs';

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
      Arg('processes', {
        description: 'Processes to run',
        multi: true,
      }),
      KWArg('excludes', {
        alias: 'x',
        description: 'Processes to exclude',
        multi: true,
      })
    )
  ),
  process.argv
);
