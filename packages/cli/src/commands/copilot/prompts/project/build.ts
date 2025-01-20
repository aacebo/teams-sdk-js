import cp from 'node:child_process';

import { CopilotContext } from '../../context';

export function handler({ log }: CopilotContext) {
  return () => {
    return new Promise<string>((resolve) => {
      log.debug('...');

      cp.exec('npm run build', (err, _, stderr) => {
        if (err) {
          log.debug(stderr);
          return resolve(stderr);
        }

        resolve('success');
      });
    });
  };
}
