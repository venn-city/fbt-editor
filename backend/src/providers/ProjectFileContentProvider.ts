import ProjectFileContent from "@entities/project/ProjectFileContent";
import ProjectFileItem from "@entities/project/ProjectFileItem";
import TranslationSourceFile from "@entities/translation/TranslationSourceFile";
import TranslationSourceItem from "@entities/translation/TranslationSourceItem";
import TranslationSourceToken from "@entities/translation/TranslationSourceToken";
import TranslationSourceTokenItem from "@entities/translation/TranslationSourceTokenItem";
import TranslationTargetFile from "@entities/translation/TranslationTargetFile";
import _ from "lodash";
import TranslationFilesProvider from "./TranslationFilesProvider";

export default class ProjectFileContentProvider {
  private readonly translationFilesProvider: TranslationFilesProvider = new TranslationFilesProvider();

  public async getProjectFileContent(
    projectId: string,
    projectFileId: string
  ): Promise<ProjectFileContent> {
    const translationSourceFile: TranslationSourceFile = await this.translationFilesProvider.getTranslationSourceFile(
      projectId,
      projectFileId
    );
    const translationTargetFile: TranslationTargetFile = await this.translationFilesProvider.getTranslationTargetFile(
      projectId,
      projectFileId
    );

    const items: ProjectFileItem[] = _.compact(
      _.map(
        translationSourceFile.phrases,
        (
          translationItem: TranslationSourceItem
        ): ProjectFileItem | undefined => {
          const jsfbt: TranslationSourceToken | null = translationItem.jsfbt as TranslationSourceToken;
          // tslint:disable-next-line: forin
          for (const key in translationItem.hashToText) {
            const value = translationItem.hashToText[key];
            return new ProjectFileItem(
              key,
              value,
              translationItem.desc,
              translationTargetFile.translations[key]?.translations || [],
              this.filterTokens(jsfbt)
            );
          }
        }
      )
    );
    return new ProjectFileContent(
      projectId,
      translationTargetFile.locale,
      projectFileId,
      _.flatten(items)
    );
  }

  private filterTokens(
    jsfbt: TranslationSourceToken
  ): TranslationSourceTokenItem[] {
    return jsfbt?.m?.filter((item) => item !== null) || [];
  }
}
