import _ from "lodash";
import { FileContentAction, FileContentState } from "../duck/fileContent";
import {
  ProjectFileItem,
  ProjectFileItemTranslation,
  TokenData,
  TranslationSourceTokenItem,
} from "./../entities";

export const getUpdatedTranslations = (
  translations: ProjectFileItemTranslation[],
  newTranslation: ProjectFileItemTranslation,
) => {
  const currentTranslation = getTranslationByVariation(
    translations,
    newTranslation.variations,
  );
  if (currentTranslation) {
    currentTranslation.translation = newTranslation.translation;
  } else {
    translations.push(newTranslation);
  }
  return [...translations];
};

export const getUpdatedTokens = (
  translations: ProjectFileItemTranslation[],
  newTranslation: ProjectFileItemTranslation,
) => {
  const currentTranslation = getTranslationByVariation(
    translations,
    newTranslation.variations,
  );
  if (currentTranslation) {
    currentTranslation.translation = newTranslation.translation;
  } else {
    translations.push(newTranslation);
  }
  return [...translations];
};

export const getTranslationByVariation = (
  translations: ProjectFileItemTranslation[],
  variations: { [index: number]: number },
): ProjectFileItemTranslation | undefined => {
  let filteredTranslations = translations;
  const keys = Object.keys(variations);
  if (keys.length === 0) {
    filteredTranslations = _.filter(
      filteredTranslations,
      (itemTranslation: ProjectFileItemTranslation) => {
        return Object.keys(itemTranslation.variations).length === 0;
      },
    );
  } else {
    const variationKeys = Object.keys(variations);
    for (const key in variationKeys) {
      const index: number = Number(variationKeys[key]);
      filteredTranslations = _.filter(
        filteredTranslations,
        (itemTranslation: ProjectFileItemTranslation) => {
          return (
            Object.keys(itemTranslation.variations).length > 0 &&
            itemTranslation.variations[index] == variations[index]
          );
        },
      );
    }
  }
  return filteredTranslations[0];
};

export const getUpdatedProjectFileItem = (
  state: FileContentState,
  action: FileContentAction,
): ProjectFileItem => {
  const currentProjectFileItem =
    state.fileContentMap[action.updateFileItemData!.id];
  const translations = getUpdatedTranslations(
    currentProjectFileItem.translations,
    action.updateFileItemData!.projectFileItemTranslation,
  );
  const hasNewTokens = _.some(
    translations,
    (t: ProjectFileItemTranslation) =>
      t.variations[action.updateFileItemData!.tokens.length - 1],
  );
  const updatedTokens = hasNewTokens
    ? _.sortBy(
        action.updateFileItemData!.tokens,
        (token: TokenData) => token.index,
    ).map((t: TokenData) => mapTokenData(t))
    : currentProjectFileItem.tokens;

  return {
    ...state.fileContentMap[action.updateFileItemData!.id],
    tokens: updatedTokens,
    translations: translations,
  } as ProjectFileItem;
};

const mapTokenData = (tokenData: TokenData): TranslationSourceTokenItem => {
  return {
    token: tokenData.name,
    type: tokenData.type,
  } as TranslationSourceTokenItem;
};
