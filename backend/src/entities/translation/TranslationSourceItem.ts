import TranslationSourceToken from './TranslationSourceToken';

export default class TranslationSourceItem {
    constructor(
        public hashToText: { [Key: string]: string; },
        public filepath: string,
        public line_beg: number,
        public col_beg: number,
        public line_end: number,
        public col_end: number,
        public type: string,
        public desc: string,
        public project: string,
        public jsfbt: string | TranslationSourceToken
    ) {

    }
}