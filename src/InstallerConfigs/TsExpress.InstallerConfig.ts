import { InstallerConfig } from '../Interfaces';
import { tsExpressTemplateFiles } from '../TemplateFiles';

export const tsExpressInstallerConfig: InstallerConfig = {
  templateFiles: tsExpressTemplateFiles,
  dependencies: ['vaports', 'express'],
  devDependencies: [
    'jest',
    'eslint',
    'nodemon',
    'ts-jest',
    'ts-node',
    'prettier',
    'supertest',
    'typescript',
    '@types/jest',
    '@types/node',
    '@types/express',
    '@types/supertest',
    'eslint-config-prettier',
    '@typescript-eslint/parser',
    'eslint-plugin-unused-imports',
    '@typescript-eslint/eslint-plugin'
  ]
};

export default tsExpressInstallerConfig;
