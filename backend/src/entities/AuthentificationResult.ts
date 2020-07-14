import { CurrentUser } from './CurrentUser';

export default class AuthentificationResult {
    constructor(public currentUser: CurrentUser|null, public statusCode: number, public message: string) {
    }
}