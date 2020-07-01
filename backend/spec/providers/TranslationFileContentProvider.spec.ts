import ProjectFileContent from '@entities/ProjectFileContent';
import ProjectFileItem from '@entities/ProjectFileItem';
import TranslationSourceFile from '@entities/TranslationSourceFile';
import TranslationSourceItem from '@entities/TranslationSourceItem';
import TranslationTargetFile from '@entities/TranslationTargetFile';
import TranslationTargetItem from '@entities/TranslationTargetItem';
import TranslationTargetItemTranslation from '@entities/TranslationTargetItemTranslation';
import TranslationFileContentProvider from 'src/providers/TranslationFileContentProvider';
import TranslationFilesProvider from 'src/providers/TranslationFilesProvider';

describe('TranslationFileContentProvider', () => {
    const hash = "hash";
    const projectId = "projectId";
    const locale = "en_EN";
    const source = "source";
    const translation: string = "translation";
    const projectFileId = "projectFolder/projectFileId.json";
    let translationFileContentProvider: TranslationFileContentProvider;

    beforeAll((done) => {
        translationFileContentProvider = new TranslationFileContentProvider();
        done();
    });

    it(`should return translationTargetFile`, async(done) => {
        const translationSourceFile: TranslationSourceFile = createTranslationSourceFile();
        const translationTargetFile: TranslationTargetFile = createTranslationTargetFile();
        const projectFileContent: ProjectFileContent = createProjectFileContent();

        spyOn(TranslationFilesProvider.prototype, 'getTranslationSourceFile').and.returnValue(Promise.resolve(translationSourceFile));

        const result: TranslationTargetFile = await translationFileContentProvider.getFileContent(projectFileContent);
        expect(result).toEqual(translationTargetFile);
        done();
    });

    it(`should throw error when language does not exist`, async(done) => {
        const projectFileContent: ProjectFileContent = new ProjectFileContent("", "", "", []);
        try {
            await translationFileContentProvider.getFileContent(projectFileContent);
        } catch(e) {
            expect(e.message).toEqual(`Target language has not been specified in file `);
        }
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
        translations[createHash(0)] = new TranslationTargetItem([],[],[new TranslationTargetItemTranslation(translation, {})]);
        translations[createHash(1)] = new TranslationTargetItem([],[],[new TranslationTargetItemTranslation("", {})]);
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