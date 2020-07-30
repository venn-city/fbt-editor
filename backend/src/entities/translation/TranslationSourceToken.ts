import TranslationSourceTokenItem from './TranslationSourceTokenItem';
import TranslationSourceTokenTranslation from './TranslationSourceTokenTranslation';

export default class TranslationSourceToken {
    constructor(
        public t: TranslationSourceTokenTranslation,
        public m: TranslationSourceTokenItem[]
    ) {

    }
}