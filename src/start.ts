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
      return {
        name: line.substring(0, index).trim(),
        command: line.substring(index + 1).trim(),
      };
    });
  } catch (error) {
    return logger.error((error && error.message) || error.toString(), true);
  }

  const filteredProcfileProcesses = procfileProcesses.filter(
    ({ name, command }) => {
      if (!name || !command) {
        return false;
      }

      if (processes.length) {
        return processes.includes(name) && !excludes.includes(name);
      }

      return !excludes.includes(name);
    }
  );

  const longestProcessNameLength = Math.max(
    0,
    ...filteredProcfileProcesses.map(({ name }) => name.length)
  );

  if (filteredProcfileProcesses.length) {
    filteredProcfileProcesses.unshift({
      name: 'router',
      command: 'router',
    });
  }

  process.stdout.setMaxListeners(20);
  process.stderr.setMaxListeners(20);

  logger.log(
    `Staring processes: ${filteredProcfileProcesses
      .map(({ name }) => name)
      .join(', ')}...`
  );

  filteredProcfileProcesses.forEach(({ name, command }, index) => {
    const color = COLORS[index % COLORS.length];
    const padding = ' '.repeat(longestProcessNameLength - name.length);
    const prefix = color(`[ ${name} ${padding}] `);

    spawn(prefix, command);
  });
}

export default start;
