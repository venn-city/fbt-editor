import ProjectFileContent from '@entities/ProjectFileContent';
import ProjectFileItem from '@entities/ProjectFileItem';
import TranslationSourceFile from '@entities/TranslationSourceFile';
import TranslationSourceItem from '@entities/TranslationSourceItem';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import _ from 'lodash';
import TranslationSourceFileProvider from './TranslationFilesProvider';

export default class ProjectFileContentProvider {
    private readonly translationSourceFileProvider: TranslationSourceFileProvider = new TranslationSourceFileProvider();

    public async getProjectFileContent(projectId: string, projectFileId: string): Promise<ProjectFileContent> {
        const translationSourceFile: TranslationSourceFile = await this.translationSourceFileProvider.getTranslationSourceFile(projectId, projectFileId);
        const translationTargetFile: TranslationTargetFile = await this.translationSourceFileProvider.getTranslationTargetFile(projectId, projectFileId);
        const items: ProjectFileItem[] = _.compact(_.map(translationSourceFile.phrases, (translationItem: TranslationSourceItem): ProjectFileItem|undefined => {
        // tslint:disable-next-line: forin
        for (const key in translationItem.hashToText) {
            const value =  translationItem.hashToText[key];
            const translation = translationTargetFile.translations[key]?.translations[0];
            return new ProjectFileItem(key, value, translation?.translation || "", translationItem.desc);
          }
        }));
        return new ProjectFileContent(projectId, translationTargetFile.locale, projectFileId, _.flatten(items));
    }
}