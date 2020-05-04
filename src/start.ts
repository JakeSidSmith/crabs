import { Tree } from 'jargs';

import { version as versionNumber } from '../package.json';
import { COLORS } from './constants';
import getProcfile from './get-procfile';
import * as logger from './logger';
import spawn from './spawn';

export type ProgramArgs = Tree<
  undefined,
  { exclude: readonly string[] | undefined },
  { version: true | undefined },
  { process: readonly string[] | undefined }
>;

function start({ args, kwargs, flags }: ProgramArgs) {
  if (flags.version) {
    logger.log(versionNumber);
    return;
  }

  const processes = (args.process ? [...args.process] : []) as string[];
  const excludes = (kwargs.exclude ? [...kwargs.exclude] : []) as string[];

  let procfileProcesses: readonly string[];

  try {
    const procfile = getProcfile();
    procfileProcesses = procfile.split('\n').map(line => {
      const index = line.indexOf(':');
      return line.substring(0, index).trim();
    });
  } catch (error) {
    return logger.error(error?.message || error.toString(), true);
  }

  const filteredProcfileProcesses = procfileProcesses.filter(name => {
    if (!name) {
      return false;
    }

    if (processes.length) {
      return processes.includes(name) && !excludes.includes(name);
    }

    return !excludes.includes(name);
  });

  if (filteredProcfileProcesses.length || processes.includes('router')) {
    if (!excludes.includes('router')) {
      filteredProcfileProcesses.unshift('router');
    }
  }

  if (!filteredProcfileProcesses.length) {
    logger.error('No processes to start', true);
  }

  const longestProcessNameLength = Math.max(
    0,
    ...filteredProcfileProcesses.map(name => name.length)
  );

  process.stdout.setMaxListeners(20);
  process.stderr.setMaxListeners(20);

  logger.log(`Staring processes: ${filteredProcfileProcesses.join(', ')}...`);

  filteredProcfileProcesses.forEach((name, index) => {
    const color = COLORS[index % COLORS.length];
    const padding = ' '.repeat(
      Math.max(0, longestProcessNameLength - name.length)
    );
    const prefix = color(`[ ${name} ${padding}] `);

    spawn(prefix, name);
  });
}

export default start;
