import { SignInContext } from '../context';

export function signin({ activity, log }: SignInContext) {
  log.debug(`${activity.from.name} has signed in...`);
}
