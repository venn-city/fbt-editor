import ProjectFileContent from '@entities/ProjectFileContent';
import ProjectFileItem from '@entities/ProjectFileItem';
import TranslationSourceFile from '@entities/TranslationSourceFile';
import TranslationSourceItem from '@entities/TranslationSourceItem';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import TranslationTargetItem from '@entities/TranslationTargetItem';
import TranslationTargetItemTranslation from '@entities/TranslationTargetItemTranslation';
import ProjectFileContentProvider from 'src/providers/ProjectFileContentProvider';
import TranslationFilesProvider from 'src/providers/TranslationFilesProvider';

describe('ProjectFileContentProvider', () => {
    const hash = "hash";
    const projectId = "projectId";
    const locale = "en_EN";
    const source = "source";
    const translation: string = "translation";
    const projectFileId = "projectFolder/projectFileId.json";
    let projectFileContentProvider: ProjectFileContentProvider;

    beforeAll((done) => {
        projectFileContentProvider = new ProjectFileContentProvider();
        done();
    });

    it(`should return s3 with settings`, async(done) => {
        const translationSourceFile: TranslationSourceFile = createTranslationSourceFile();
        const translationTargetFile: TranslationTargetFile = createTranslationTargetFile();
        const projectFileContent: ProjectFileContent = createProjectFileContent();

        spyOn(TranslationFilesProvider.prototype, 'getTranslationSourceFile').and.returnValue(Promise.resolve(translationSourceFile));
        spyOn(TranslationFilesProvider.prototype, 'getTranslationTargetFile').and.returnValue(Promise.resolve(translationTargetFile));

        const result: ProjectFileContent = await projectFileContentProvider.getProjectFileContent(projectId, projectFileId);
        expect(result).toEqual(projectFileContent);
        done();
    });

    function createTranslationSourceFile(): TranslationSourceFile {

        const translationSourceItems: TranslationSourceItem[] = [createTranslationSourceItem(0), createTranslationSourceItem(1)];
        return new TranslationSourceFile(translationSourceItems);
    }
    function createTranslationSourceItem(index: number): TranslationSourceItem {
        const hashToText: { [Key: string]: string; } = {};
        hashToText[createHash(index)] = createSource(index);
        return new TranslationSourceItem(hashToText, "", 0, 0, 0, 0, "", "", "", "");
    }

    function createTranslationTargetFile(): TranslationTargetFile {
        const translations: { [Key: string]: TranslationTargetItem; } = {};
        translations[createHash(0)] = new TranslationTargetItem([],[],[new TranslationTargetItemTranslation(translation, "")]);
        return new TranslationTargetFile(locale, translations);
    }

    function createProjectFileContent(): ProjectFileContent {
        const items: ProjectFileItem[] = [
            createProjectFileItem(0, translation),
            createProjectFileItem(1, "")
        ];
        return new ProjectFileContent(projectId, locale, projectFileId, items);
    }

    function createProjectFileItem(sourceIndex: number, target: string): ProjectFileItem {
        return new ProjectFileItem(createHash(sourceIndex), createSource(sourceIndex), target, "");
    }

    function createHash(index: number): string {
        return `${hash}${index}`;
    }

    function createSource(index: number): string {
        return `${source}${index}`;
    }
 });