import { TemplateFile } from '../Interfaces';
import { TemplateValue } from '../Types';

const sharedPrefix = 'Templates/Shared/';

export const gitIgnore: TemplateFile = {
  readPath: sharedPrefix + 'gitignore.tmpl',
  writePath: '.gitignore'
};

export const license: TemplateValue = {
  inPath: sharedPrefix + 'LICENSE.tmpl',
  outPath: 'LICENSE.txt'
};
