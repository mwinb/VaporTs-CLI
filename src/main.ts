#! /usr/bin/env node

import { TemplateInstaller } from './Classes';

import { tsExpressTemplateFiles } from './TemplateFiles';

export async function main() {
  console.log('VaporTs CLI');
  console.log('Creating Typescript VaporTs Project');
  await new TemplateInstaller(tsExpressTemplateFiles).initTemplateFiles();
}

main();
