import AuthentificationResult from '@entities/AuthentificationResult';
import { AuthentificationSettings } from '@entities/AuthentificationSettings';
import CurrentUser from '@entities/CurrentUser';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import AuthentificationProvider from 'src/providers/AuthentificationProvider';
import UsersProvider from 'src/providers/UsersProvider';

export default class AuthentificationService {
    private readonly authentificationProvider: AuthentificationProvider = new AuthentificationProvider();
    private readonly usersProvider: UsersProvider = new UsersProvider();
    private readonly authentificationSettings: AuthentificationSettings;
    private readonly client: OAuth2Client;

    constructor() {
        this.authentificationSettings = this.authentificationProvider.getAuthentificationSettings();
        this.client = new OAuth2Client(this.authentificationSettings.clientId, this.authentificationSettings.secret);
    }

    public async login(token: string): Promise<AuthentificationResult>  {
        let payload: TokenPayload | undefined;
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audience: this.authentificationSettings.clientId
            });
            payload = ticket.getPayload();
        } catch(e) {
            return new AuthentificationResult(null, UNAUTHORIZED, "Authentification failed");
        }
        if (payload) {
            if (!this.usersProvider.contains(payload.email!)) {
                return new AuthentificationResult(null, UNAUTHORIZED, "You don't have rights to access! Please contact to project owner");
            }
            if (payload?.aud !== this.authentificationSettings.clientId) {
                return new AuthentificationResult(null, UNAUTHORIZED, "Wrong recipient, payload audience");
            }
            const currentUser = new CurrentUser(token, payload.name!, payload.email!, payload.picture!);
            return new AuthentificationResult(currentUser, OK, "");
        }
        return new AuthentificationResult(null, BAD_REQUEST, "Bad request");
    }
}
