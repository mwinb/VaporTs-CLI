#! /usr/bin/env node

import { TemplateInstaller } from './Classes';
import { tsExpressInstallerConfig } from './InstallerConfigs';

export async function main() {
  console.log('VaporTs CLI');
  console.log('Creating Typescript VaporTs Project');
  await new TemplateInstaller(tsExpressInstallerConfig).install();
  console.log('\n\nCreated New VaporTs Express Project');
  console.log('Start               npm start');
  console.log('Start dev           npm run start:dev');
  console.log('Build               npm run build');
  console.log('Unit tests (watch)  npm run test');
  console.log('Unit tests          npm run test:unit');
  console.log('Integration tests   npm run test:integration');
  console.log('All tests           npm run test:all');
  console.log('Lint (eslint)       npm run lint');
  console.log('Format (prettier)   npm run format');
}

main();
