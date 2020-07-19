import AuthenticationResult from '@entities/AuthenticationResult';
import { AuthenticationSettings } from '@entities/AuthenticationSettings';
import CurrentUser from '@entities/CurrentUser';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { BAD_REQUEST, OK, UNAUTHORIZED } from 'http-status-codes';
import AuthenticationProvider from 'src/providers/AuthenticationProvider';
import UsersProvider from 'src/providers/UsersProvider';

export default class AuthenticationService {
    private readonly authenticationProvider: AuthenticationProvider = new AuthenticationProvider();
    private readonly usersProvider: UsersProvider = new UsersProvider();
    private readonly authenticationSettings: AuthenticationSettings;
    private readonly client: OAuth2Client;

    constructor() {
        this.authenticationSettings = this.authenticationProvider.getAuthenticationSettings();
        this.client = new OAuth2Client(this.authenticationSettings.clientId, this.authenticationSettings.secret);
    }

    public async login(token: string): Promise<AuthenticationResult>  {
        let payload: TokenPayload | undefined;
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audience: this.authenticationSettings.clientId
            });
            payload = ticket.getPayload();
        } catch(e) {
            return new AuthenticationResult(null, UNAUTHORIZED, "Authentication failed");
        }
        if (payload) {
            if (!this.usersProvider.contains(payload.email!)) {
                return new AuthenticationResult(null, UNAUTHORIZED, "You don't have rights to access! Please contact to project owner");
            }
            if (payload?.aud !== this.authenticationSettings.clientId) {
                return new AuthenticationResult(null, UNAUTHORIZED, "Wrong recipient, payload audience");
            }
            const currentUser = new CurrentUser(token, payload.name!, payload.email!, payload.picture!);
            return new AuthenticationResult(currentUser, OK, "");
        }
        return new AuthenticationResult(null, BAD_REQUEST, "Bad request");
    }
}
