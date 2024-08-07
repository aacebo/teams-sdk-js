import { TaskFetchInvokeActivity } from './task-fetch';
import { TaskSubmitInvokeActivity } from './task-submit';

export type TaskInvokeActivity<D = any> = TaskFetchInvokeActivity<D> | TaskSubmitInvokeActivity<D>;

export * from './task-fetch';
export * from './task-submit';
