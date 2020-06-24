import ProjectFileContent from '@entities/ProjectFileContent';
import ProjectFileItem from '@entities/ProjectFileItem';
import TranslationSourceFile from '@entities/TranslationSourceFile';
import TranslationSourceItem from '@entities/TranslationSourceItem';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import TranslationTargetItem from '@entities/TranslationTargetItem';
import TranslationTargetItemTranslation from '@entities/TranslationTargetItemTranslation';
import _ from 'lodash';
import path from 'path';
import TranslationSourceFileProvider from './TranslationFilesProvider';

export default class TranslationFileContentProvider {
    private readonly translationSourceFileProvider: TranslationSourceFileProvider = new TranslationSourceFileProvider();

    public async getFileContent(projectFileContent: ProjectFileContent): Promise<TranslationTargetFile> {
        if (!projectFileContent.targetLanguage) {
            throw new Error(`Target language has not been specified in file ${path.basename(projectFileContent.fileId)}`);
        }
        const translationSourceFile: TranslationSourceFile = await this.translationSourceFileProvider.getTranslationSourceFile(
            projectFileContent.projectId,
            projectFileContent.fileId);
        const translations: { [Key: string]: TranslationTargetItem; } = {};

        _.forEach(translationSourceFile.phrases, (translationItem: TranslationSourceItem): void => {
        // tslint:disable-next-line: forin
        for (const key in translationItem.hashToText) {
            const value =  projectFileContent.projectFileItems.filter((item: ProjectFileItem) => item.id === key)[0];
            const translation: string =  value?.target || "";
            const translationTargetItem = new TranslationTargetItem([],[],[new TranslationTargetItemTranslation(translation, {})]);
            translations[key] = translationTargetItem;
          }
        });
        return new TranslationTargetFile(projectFileContent.targetLanguage, translations);
    }
}