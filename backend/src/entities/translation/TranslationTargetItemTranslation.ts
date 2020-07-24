export default class TranslationTargetItemTranslation {
    constructor(
        public translation: string,
        public variations: { [key: number]: number}) {
    }
}