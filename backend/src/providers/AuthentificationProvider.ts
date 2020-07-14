import { AuthentificationConfiguration } from '@entities/AuthentificationConfiguration';
import { AuthentificationCookies } from '@entities/AuthentificationCookies';
import { AuthentificationSettings } from '@entities/AuthentificationSettings';
import { Request, Response } from "express";
import md5 from 'md5';
import appSettingsCache from 'src/cache/AppSettingsCache';

export default class AuthentificationProvider {
    private readonly defaultMaxAge: number = 3600000;
    private readonly cookiesTokenName: string = "token";

    public getAuthentificationSettings(): AuthentificationSettings {
        return this.getAuthentificationConfiguration().google;
    }

    private getAuthentificationConfiguration(): AuthentificationConfiguration {
        return appSettingsCache.getAuthentificationConfiguration();
    }

    public getCookiesSecret(): string {
        return appSettingsCache.getAuthentificationConfiguration().cookiesSecret;
    }

    private getCookiesMaxAge(): number {
        return appSettingsCache.getAuthentificationConfiguration().cookiesMaxAge || this.defaultMaxAge;
    }

    public verifyAuthCookies(req: Request): boolean {
        const authCookies = req.signedCookies[this.cookiesTokenName];
        if (authCookies) {
            const result = JSON.parse(authCookies) as AuthentificationCookies;
            return result.hash === md5(result.token);
        }
        return false;
    }

    public setAuthCookies(res: Response, token: string): void {
        const authCookie = new AuthentificationCookies(token, md5(token));
        res.cookie(this.cookiesTokenName, JSON.stringify(authCookie), { maxAge: this.getCookiesMaxAge(), signed: true});
    }
}