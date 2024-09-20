export type Credentials = SingleTenantCredentials | MultiTenantCredentials;

export interface SingleTenantCredentials {
  readonly type: 'SingleTenant';
  readonly clientId: string;
  readonly clientSecret: string;
  readonly tenantId: string;
}

export interface MultiTenantCredentials {
  readonly type: 'MultiTenant';
  readonly clientId: string;
  readonly clientSecret: string;
}
