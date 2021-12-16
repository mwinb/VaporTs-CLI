import * as fs from 'fs';
import * as prompts from 'prompts';
import * as helpers from '../Helpers/Common.Helpers';
import { TemplateInstaller } from '.';
import { TemplateFile } from '../Interfaces';
import { PackageInstaller } from '.';

const mockTemplateStringSingle = 'Some content {{ replaceMe }} {{ replaceMe }}';
const mockPrompt: prompts.PromptObject = {
  type: 'text',
  name: 'replaceMe',
  message: 'Injected value'
};
describe('Ts Express Installer', () => {
  let templateInstaller: TemplateInstaller;
  let mockFiles: TemplateFile[];

  beforeEach(() => {
    mockFiles = [{ readPath: 'templates/shared/directCopy.tmpl', writePath: 'src/directCopy.js' }];
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockTemplateStringSingle);
    jest.spyOn(fs, 'writeFileSync').mockImplementation();
    jest.spyOn(fs, 'copyFileSync').mockImplementation();
    jest.spyOn(helpers, 'getBinPath').mockReturnValue('');
    jest.spyOn(PackageInstaller, 'installDev').mockImplementation();
    jest.spyOn(PackageInstaller, 'installProd').mockImplementation();
    templateInstaller = new TemplateInstaller({
      templateFiles: mockFiles,
      dependencies: ['dep'],
      devDependencies: ['devDep']
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('construction', () => {
    it('takes in a list of TemplateFile objects', () => {
      expect(templateInstaller['templateFiles']).toEqual(mockFiles);
    });
  });

  it('updates the prompt values with any new values', () => {
    templateInstaller.promptValues = { firstValue: 'val' };
    templateInstaller.promptValues = { secondValue: 'val' };
    expect(templateInstaller.promptValues).toEqual({ firstValue: 'val', secondValue: 'val' });
  });

  it('copies a file if no prompts are provided', async () => {
    await templateInstaller.initTemplateFiles();
    expect(fs.copyFileSync).toHaveBeenLastCalledWith(mockFiles[0].readPath, mockFiles[0].writePath);
  });

  it('handles prompting and writing the values to the provided template when prompts are included', async () => {
    prompts.inject(['replaced', true]);
    templateInstaller['templateFiles'].push({ ...mockFiles[0], prompts: [mockPrompt] });

    await templateInstaller.initTemplateFiles();
    expect(fs.writeFileSync).toHaveBeenLastCalledWith(mockFiles[0].writePath, 'Some content replaced replaced');
  });

  it('installs the files and dependencies', async () => {
    jest.spyOn(TemplateInstaller.prototype, 'initTemplateFiles').mockImplementation();
    await templateInstaller.install();

    expect(TemplateInstaller.prototype.initTemplateFiles).toHaveBeenCalled();
    expect(PackageInstaller.installDev).toHaveBeenCalledWith(['devDep']);
    expect(PackageInstaller.installProd).toHaveBeenCalledWith(['dep']);
  });
});
