import { CurrentUser } from './CurrentUser';

export default class AuthenticationResult {
    constructor(public currentUser: CurrentUser|null, public statusCode: number, public message: string) {
    }
}