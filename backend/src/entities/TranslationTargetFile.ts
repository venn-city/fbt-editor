import TranslationTargetItem from './TranslationTargetItem';

export default class TranslationTargetFile {
    constructor(public locale: string, public translations: { [Key: string]: TranslationTargetItem; } ) {
    }
}