import _ from "lodash";
import { orderedTokens, TokenGender, TokenNumber } from "../tokens";
import {
  ProjectFileItemTranslation,
  TokenData,
  TokenInfo,
  TranslationSourceTokenItem,
} from "./../entities";

export const getTokensData = (
  translationSourceTokenItems: TranslationSourceTokenItem[],
  projectFileItemTranslation: ProjectFileItemTranslation,
) => {
  var result: TokenData[] = [];
  _.forEach(orderedTokens, (token: TokenInfo) => {
    const translationSourceTokenItem: TranslationSourceTokenItem = _.filter(
      translationSourceTokenItems,
      (item: TranslationSourceTokenItem) => item.token === token.name,
    )[0];
    if (translationSourceTokenItem) {
      const index: number = translationSourceTokenItems.indexOf(
        translationSourceTokenItem,
      );
      const tokenData = {
        name: token.name,
        displayName: token.displayName,
        value: projectFileItemTranslation.variations[index] || 0,
        index: index,
        type: token.type,
        possibleValues: getPossibleValues(token.type),
      } as TokenData;
      result.push(tokenData);
    } else if (token.required) {
      const tokenData = {
        name: token.name,
        displayName: token.displayName,
        value: 0,
        type: token.type,
        index: result.length,
        possibleValues: getPossibleValues(token.type),
      } as TokenData;
      result.push(tokenData);
    }
  });
  return result;
};

const getPossibleValues = (tokenType: number): { [key: number]: string } => {
  if (tokenType === 3) {
    return TokenGender;
  }
  if (tokenType === 28) {
    return TokenNumber;
  }
  return {};
};
