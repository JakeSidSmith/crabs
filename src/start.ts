import { Tree } from 'jargs';

import { COLORS } from './constants';
import getProcfile from './get-procfile';
import * as logger from './logger';
import spawn from './spawn';

function start({ args, kwargs }: Tree) {
  const processes = (args.processes ? [...args.processes] : []) as string[];
  const excludes = (kwargs.excludes ? [...kwargs.excludes] : []) as string[];

  let procfileProcesses;

  try {
    const procfile = getProcfile();
    procfileProcesses = procfile.split('\n').map(line => {
      const index = line.indexOf(':');
      return line.substring(0, index).trim();
    });
  } catch (error) {
    return logger.error((error && error.message) || error.toString(), true);
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
