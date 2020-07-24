import ProjectFileContent from "@entities/project/ProjectFileContent";
import ProjectFileItem from "@entities/project/ProjectFileItem";
import TranslationSourceFile from "@entities/translation/TranslationSourceFile";
import TranslationSourceItem from "@entities/translation/TranslationSourceItem";
import TranslationTargetFile from "@entities/translation/TranslationTargetFile";
import TranslationTargetItem from "@entities/translation/TranslationTargetItem";
import _ from "lodash";
import path from "path";
import TranslationFilesProvider from "./TranslationFilesProvider";

export default class TranslationFileContentProvider {
  private readonly translationFilesProvider: TranslationFilesProvider = new TranslationFilesProvider();

  public async getFileContent(
    projectFileContent: ProjectFileContent
  ): Promise<TranslationTargetFile> {
    if (!projectFileContent.targetLanguage) {
      throw new Error(
        `Target language has not been specified in file ${path.basename(
          projectFileContent.fileId
        )}`
      );
    }
    const translationSourceFile: TranslationSourceFile = await this.translationFilesProvider.getTranslationSourceFile(
      projectFileContent.projectId,
      projectFileContent.fileId
    );
    const translations: { [Key: string]: TranslationTargetItem } = {};

    _.forEach(
      translationSourceFile.phrases,
      (translationItem: TranslationSourceItem): void => {
        // tslint:disable-next-line: forin
        for (const key in translationItem.hashToText) {
          const value: ProjectFileItem | null = projectFileContent.projectFileItems.filter(
            (item: ProjectFileItem) => item.id === key
          )[0];
          if (value) {
            translations[key] = new TranslationTargetItem(
              value.tokens.map((token) => token.token),
              value.tokens.map((token) => token.type),
              this.filterTranslations(value)
            );
          }
        }
      }
    );
    return new TranslationTargetFile(
      projectFileContent.targetLanguage,
      translations
    );
  }

  private filterTranslations(value: ProjectFileItem) {
    return (
      value.translations.filter((tran) => tran.translation.length > 0) || []
    );
  }
}
