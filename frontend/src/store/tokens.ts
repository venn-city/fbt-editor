import { TokenInfo } from "./entities";

export const viewerToken: TokenInfo = {
  name: "__viewing_user__",
  type: 3,
  displayName: "Viewing user",
  required: true,
};
export const subjectToken: TokenInfo = {
  name: "__subject__",
  type: 3,
  displayName: "Subject",
  required: false,
};
export const nameToken: TokenInfo = {
  name: "name",
  type: 3,
  displayName: "Name",
  required: false,
};
export const numberToken: TokenInfo = {
  name: "number",
  type: 28,
  displayName: "Number",
  required: false,
};

export const orderedTokens: TokenInfo[] = [
  nameToken,
  numberToken,
  subjectToken,
  viewerToken,
];

export const TokenGender: { [key: number]: string } = {
  0: "N/A",
  1: "Male",
  2: "Female",
  3: "Unknown",
};

export const TokenNumber: { [key: number]: string } = {
  0: "N/A",
  4: "NUMBER_ONE",
  8: "NUMBER_TWO",
  12: "NUMBER_MANY",
  16: "NUMBER_ZERO",
  20: "NUMBER_FEW",
  24: "NUMBER_OTHER",
};
