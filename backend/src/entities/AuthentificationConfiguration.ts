import { AuthentificationSettings } from './AuthentificationSettings';

export class AuthentificationConfiguration {
    public constructor(public google: AuthentificationSettings, public cookiesSecret: string, public cookiesMaxAge: number) {

    }
}