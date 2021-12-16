import { gitIgnore } from '.';
import { jsonStringify } from '../Helpers';
import { TemplateFile } from '../Interfaces';
import {
  authorPrompt,
  licensePrompt,
  projectDescriptionPrompt,
  projectKeywordsPrompt,
  projectNamePrompt,
  repositoryPrompt,
  versionPrompt
} from '../Prompts';

const inPrefix = 'Templates/TypeScript/';

export const tsExpressTemplateFiles: TemplateFile[] = [
  {
    readPath: inPrefix + 'package.tmpl',
    writePath: 'package.json',
    prompts: [
      projectNamePrompt,
      versionPrompt,
      authorPrompt,
      projectDescriptionPrompt,
      projectKeywordsPrompt,
      repositoryPrompt,
      licensePrompt
    ],
    stringify: jsonStringify
  },
  gitIgnore,
  {
    readPath: inPrefix + 'tsconfig.tmpl',
    writePath: 'tsconfig.json'
  },
  {
    readPath: inPrefix + 'tsconfig.eslint.tmpl',
    writePath: 'tsconfig.eslint.json'
  },
  {
    readPath: inPrefix + 'prettierrc.tmpl',
    writePath: '.prettierc.tmpl'
  },
  {
    readPath: inPrefix + 'jest.integration.tmpl',
    writePath: 'jest.integration.js'
  },
  {
    readPath: inPrefix + 'jest.config.tmpl',
    writePath: 'jest.config.js'
  },
  {
    readPath: inPrefix + 'jest.all.tmpl',
    writePath: 'jest.all.js'
  },
  {
    readPath: inPrefix + 'eslintrc.tmpl',
    writePath: '.eslintrc'
  },
  {
    readPath: inPrefix + 'Express/app.tmpl',
    writePath: 'src/app.ts'
  },
  {
    readPath: inPrefix + 'Express/example.controller.tmpl',
    writePath: 'src/controllers/helloWorld.ts'
  },
  {
    readPath: inPrefix + 'Express/example.controller.test.tmpl',
    writePath: 'src/controllers/helloWorld.test.ts'
  },
  {
    readPath: inPrefix + 'Express/example.controller.integration.tmpl',
    writePath: 'src/controllers/helloWorld.integration.ts'
  }
];
