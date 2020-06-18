import ProjectFileContent from '@entities/ProjectFileContent';
import TranslationSourceFileProvider from './TranslationFilesProvider';
import TranslationSourceFile from '@entities/TranslationSourceFile';
import ProjectFileItem from '@entities/ProjectFileItem';
import _ from 'lodash';
import TranslationSourceItem from '@entities/TranslationSourceItem';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import TranslationTargetItem from '@entities/TranslationTargetItem';
import TranslationTargetItemTranslation from '@entities/TranslationTargetItemTranslation';

export default class TranslationFileContentProvider {
    private translationSourceFileProvider: TranslationSourceFileProvider = new TranslationSourceFileProvider();

    public async getFileContent(projectFileContent: ProjectFileContent): Promise<TranslationTargetFile> {
        var translationSourceFile: TranslationSourceFile = await this.translationSourceFileProvider.getTranslationSourceFile(
            projectFileContent.projectName,
            projectFileContent.fileId);
        var translations: { [Key: string] : TranslationTargetItem; } = {}; 

        _.forEach(translationSourceFile.phrases, (translationItem: TranslationSourceItem):void => {
        for (var key in translationItem.hashToText) {
            var value =  projectFileContent.projectFileItems.filter((item: ProjectFileItem) => item.id === key)[0];
            var translation: string =  value?.target || "";
            var translationTargetItem = new TranslationTargetItem([],[],[new TranslationTargetItemTranslation(translation, {})])
            translations[key] = translationTargetItem;
          }
        });
        return new TranslationTargetFile(projectFileContent.targetLanguage, translations);
    }
}