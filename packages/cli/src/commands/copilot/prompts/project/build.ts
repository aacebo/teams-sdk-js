import cp from 'node:child_process';

import { CopilotContext } from '../../context';

export function handler({ log }: CopilotContext) {
  return () => {
    log.debug('...');

    try {
      cp.execSync('npm run build');
      return 'success';
    } catch (err) {
      if (err instanceof Buffer) {
        return err.toString();
      }

      return 'failed';
    }
  };
}
