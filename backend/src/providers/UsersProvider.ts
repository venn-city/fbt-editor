import _ from 'lodash';
import appSettingsCache from 'src/cache/AppSettingsCache';

export default class UsersProvider {
    public contains(email: string): boolean {
        return _(this.getUsers()).includes(email);
    }

    private getUsers(): string[] {
        return appSettingsCache.getUsers();
    }
}