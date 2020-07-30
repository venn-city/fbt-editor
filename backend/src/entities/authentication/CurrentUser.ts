export class CurrentUser {
  constructor(
    public tokenId: string,
    public name: string,
    public email: string,
    public profileImageUrl: string
  ) {}
}
export default CurrentUser;
