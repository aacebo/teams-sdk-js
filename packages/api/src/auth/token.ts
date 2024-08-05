import jwt from 'jsonwebtoken';

import { CallerIds, CallerType } from './caller';

export class Token {
  private readonly _payload: jwt.JwtPayload;

  get audience() {
    return this._payload.aud;
  }

  get issuer() {
    return this._payload.iss;
  }

  get keyId(): string | undefined {
    return this._payload['kid'];
  }

  get appId(): string {
    return this._payload['appid'];
  }

  get tenantId(): string | undefined {
    return this._payload['tid'];
  }

  get version(): string | undefined {
    return this._payload['version'];
  }

  get serviceUrl(): string {
    let v: string = this._payload['serviceurl'] || 'https://smba.trafficmanager.net/teams';

    if (v.endsWith('/')) {
      v = v.slice(0, v.length - 1);
    }

    return v;
  }

  get from(): CallerType {
    if (this.appId) {
      return 'bot';
    }

    return 'azure';
  }

  get fromId(): string {
    if (this.from === 'bot') {
      return `${CallerIds.bot}:${this.appId}`;
    }

    if (this.from === 'gov') {
      return CallerIds.gov;
    }

    return CallerIds.azure;
  }

  constructor(value: string) {
    const decoded = jwt.decode(value, { complete: true, json: true });

    if (!decoded) {
      throw new Error('failed to decode token');
    }

    this._payload = decoded.payload as jwt.JwtPayload;
  }
}
