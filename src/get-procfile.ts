import * as fs from 'fs';
import * as path from 'path';

import { UTF8 } from './constants';

function getProcfile(): string {
  if (!process.env.PROC_FILE) {
    const cwdProcfilePath = path.resolve(process.cwd(), 'Procfile');

    if (!fs.existsSync(cwdProcfilePath)) {
      throw new Error(`Could not find Procfile at ${cwdProcfilePath}`);
    }

    return fs.readFileSync(cwdProcfilePath, UTF8);
  }

  const paths = process.env.PROC_FILE.split(',').map(procfilePath =>
    path.resolve(procfilePath)
  );

  for (const procfilePath of paths) {
    if (fs.existsSync(procfilePath)) {
      return fs.readFileSync(procfilePath, UTF8);
    }
  }

  throw new Error(
    `Could not find a Procfile at any of the defined paths:\n${paths.join(
      '\n'
    )}`
  );
}

export default getProcfile;
