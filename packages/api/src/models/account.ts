import { Role } from './role';

export interface Account<P = any> {
  readonly id: string;
  readonly aadObjectId?: string;
  readonly role: Role;
  readonly name: string;
  readonly properties?: P;
}

export interface ConversationAccount<P = any> extends Account<P> {
  readonly tenantId?: string;
  readonly conversationType: string;
  readonly isGroup: boolean;
}
