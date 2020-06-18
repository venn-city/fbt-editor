import ProjectFileContent from '@entities/ProjectFileContent';
import TranslationSourceFileProvider from './TranslationFilesProvider';
import TranslationSourceFile from '@entities/TranslationSourceFile';
import ProjectFileItem from '@entities/ProjectFileItem';
import _ from 'lodash';
import TranslationSourceItem from '@entities/TranslationSourceItem';
import TranslationTargetFile from '@entities/TranslationTargetFile';

export default class ProjectFileContentProvider {
    private translationSourceFileProvider: TranslationSourceFileProvider = new TranslationSourceFileProvider();

    public async getProjectFileContent(projectName: string, projectFileId: string): Promise<ProjectFileContent> {
        var translationSourceFile: TranslationSourceFile = await this.translationSourceFileProvider.getTranslationSourceFile(projectName, projectFileId);
        var translationTargetFile: TranslationTargetFile = await this.translationSourceFileProvider.getTranslationTargetFile(projectName, projectFileId);
        var items: ProjectFileItem[] = _.compact(_.map(translationSourceFile.phrases, (translationItem: TranslationSourceItem): ProjectFileItem|undefined => {
        for (var key in translationItem.hashToText) {
            var value =  translationItem.hashToText[key];
            const translation = translationTargetFile.translations[key]?.translations[0]
            return new ProjectFileItem(key, value, translation?.translation || "", translationItem.desc);
          }
        }));
        
        return new ProjectFileContent(projectName, translationTargetFile.locale, projectFileId, _.flatten(items));
    }
}