import _ from "lodash";
import { ProjectFileItemTranslation } from "./../entities";

export const getUpdatedTranslations = (
  translations: ProjectFileItemTranslation[],
  newTranslation: ProjectFileItemTranslation
) => {
  const currentTranslation = getTranslationByVariation(
    translations,
    newTranslation.variations
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
  variations: { [index: number]: number }
): ProjectFileItemTranslation | undefined => {
  let filteredTranslations = translations;
  const keys = Object.keys(variations);
  if (keys.length === 0) {
    filteredTranslations = _.filter(
      filteredTranslations,
      (itemTranslation: ProjectFileItemTranslation) => {
        return Object.keys(itemTranslation.variations).length === 0;
      }
    );
  } else {
    for (const key in Object.keys(variations)) {
      const index: number = Number(key);
      filteredTranslations = _.filter(
        filteredTranslations,
        (itemTranslation: ProjectFileItemTranslation) => {
          return (
            Object.keys(itemTranslation.variations).length > 0 &&
            itemTranslation.variations[index] == variations[index]
          );
        }
      );
    }
  }
  return filteredTranslations[0];
};
