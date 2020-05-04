import { red } from 'chalk';

export const log = (message: string) => {
  // tslint:disable-next-line:no-console
  console.log(message);
};

export const error = (message: string, exit: boolean) => {
  log(red(message));
  if (exit) {
    return process.exit(1);
  }
};
