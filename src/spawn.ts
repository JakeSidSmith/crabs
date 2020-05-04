import { red } from 'chalk';
import * as childProcess from 'child_process';
import * as es from 'event-stream';

import { MATCHES_SPACES } from './constants';
import * as logger from './logger';

function spawn(prefix: string, proc: string) {
  const subProcess = childProcess.spawn('crab', proc.split(MATCHES_SPACES), {
    shell: true,
    stdio: 'pipe',
  });

  const mapOutput = (message: any, cb: any) => {
    cb(null, `${prefix}${message}\n`);
  };

  subProcess.stdout
    .pipe(es.split('\n'))
    .pipe(es.map(mapOutput))
    .pipe(process.stderr);

  subProcess.stderr
    .pipe(es.split('\n'))
    .pipe(es.map(mapOutput))
    .pipe(process.stderr);

  subProcess.on('close', code => {
    const exitMessage = `Process exited with code ${code}`;

    if (code) {
      logger.log(`${prefix}${red(exitMessage)}`);
    } else {
      logger.log(`${prefix}${exitMessage}`);
    }
  });
}

export default spawn;
