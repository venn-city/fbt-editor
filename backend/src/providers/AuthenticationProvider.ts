import { AuthenticationConfiguration } from '@entities/AuthenticationConfiguration';
import { AuthenticationCookies } from '@entities/AuthenticationCookies';
import { AuthenticationSettings } from '@entities/AuthenticationSettings';
import { Request, Response } from "express";
import md5 from 'md5';
import appSettingsCache from 'src/cache/AppSettingsCache';

export default class AuthenticationProvider {
    private readonly defaultMaxAge: number = 3600000;
    private readonly cookiesTokenName: string = "token";

    public getAuthenticationSettings(): AuthenticationSettings {
        return this.getAuthenticationConfiguration().google;
    }

    private getAuthenticationConfiguration(): AuthenticationConfiguration {
        return appSettingsCache.getAuthenticationConfiguration();
    }

    public getCookiesSecret(): string {
        return appSettingsCache.getAuthenticationConfiguration().cookiesSecret;
    }

    private getCookiesMaxAge(): number {
        return appSettingsCache.getAuthenticationConfiguration().cookiesMaxAge || this.defaultMaxAge;
    }

    public verifyAuthCookies(req: Request): boolean {
        const authCookies = req.signedCookies[this.cookiesTokenName];
        if (authCookies) {
            const result = JSON.parse(authCookies) as AuthenticationCookies;
            return result.hash === md5(result.token);
        }
        return false;
    }

    public setAuthCookies(res: Response, token: string): void {
        const authCookie = new AuthenticationCookies(token, md5(token));
        res.cookie(this.cookiesTokenName, JSON.stringify(authCookie), { maxAge: this.getCookiesMaxAge(), signed: true});
    }
}