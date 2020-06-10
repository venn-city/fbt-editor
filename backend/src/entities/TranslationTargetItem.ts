import TranslationTargetItemTranslation from './TranslationTargetItemTranslation';

export default class TranslationTargetItem {
    constructor(
        public tokens: string[],
        public types: string[],
        public translations: TranslationTargetItemTranslation[]) {
    }
}