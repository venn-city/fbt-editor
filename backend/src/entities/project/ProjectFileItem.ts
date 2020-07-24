import TranslationSourceTokenItem from "@entities/translation/TranslationSourceTokenItem";
import TranslationTargetItemTranslation from "@entities/translation/TranslationTargetItemTranslation";

export default class ProjectFileItem {
  constructor(
    public id: string,
    public source: string,
    public description: string,
    public translations: TranslationTargetItemTranslation[],
    public tokens: TranslationSourceTokenItem[]
  ) {}
}
