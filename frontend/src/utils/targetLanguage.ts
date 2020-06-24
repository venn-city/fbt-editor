import langmap from 'langmap';

export const getTargetLanguageItems = () => Object.keys(langmap).map(key => ({ code: key, name: langmap[key].englishName }));

export const getTargetLanguageDisplayName = (code:string, name:string) => `${name} - ${code}`;
