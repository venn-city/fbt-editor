import TranslationTargetItemTranslation from './TranslationTargetItemTranslation';

export default class TranslationTargetItem {
    constructor(
        public tokens: string[],
        public types: number[],
        public translations: TranslationTargetItemTranslation[]) {
    }
}