import * as fs from 'fs';
import * as helpers from '../Helpers/Common.Helpers';
import { TemplateValue } from '../Types';
import { TemplateFile } from '../Interfaces';
import { FileHandler, TemplateModel } from '.';

const mockStringifyTemplateModel = (val: TemplateValue) => `${val}`;
const mockTemplateStringSingle = 'Some content {{ replaceMe }} {{ replaceMe }}';
const mockTemplateStringMultiple = 'Some content {{ firstReplacement }} {{ secondReplacement }}';

describe('template builder', () => {
  let existSyncSpy: jest.SpyInstance<any, any>;
  let mockFiles: TemplateFile[];
  let fileHandler: FileHandler;

  beforeEach(() => {
    mockFiles = [{ readPath: 'templates/shared/directCopy.tmpl', writePath: 'src/directCopy.js' }];
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockTemplateStringSingle);
    jest.spyOn(fs, 'writeFileSync').mockImplementation();
    jest.spyOn(fs, 'copyFileSync').mockImplementation();
    jest.spyOn(helpers, 'getBinPath').mockReturnValue('binPath');
    jest.spyOn(fs, 'mkdirSync').mockImplementation();
    existSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    fileHandler = new FileHandler(mockFiles[0].readPath, mockFiles[0].writePath);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates a file handle using the process exec path to read from and a template file', () => {
    fileHandler = FileHandler.fromBinTemplateFile(mockFiles[0]);
    expect(fileHandler.readPath).toBe('binPath/templates/shared/directCopy.tmpl');
  });

  it('uses the provided read path as the write path if none is provided', () => {
    expect(new FileHandler('read/path').writePath).toBe('read/path');
  });

  it('sets the content to write to file', () => {
    expect(fileHandler.setFileContent('new content').fileContent).toBe('new content');
  });

  it('copies a template given a template file', () => {
    fileHandler.copyFile();
    expect(fs.copyFileSync).toHaveBeenLastCalledWith('templates/shared/directCopy.tmpl', 'src/directCopy.js');
  });

  it('reads a template given a template file', () => {
    expect(fileHandler.readFile().fileContent).toBe(mockTemplateStringSingle);
  });

  it('writes a template if the templateContent is defined', () => {
    fileHandler.readFile().writeFile();
    expect(fs.writeFileSync).toHaveBeenLastCalledWith('src/directCopy.js', mockTemplateStringSingle);
  });

  it('throws an error if no file has been read', () => {
    expect(() => fileHandler.writeFile()).toThrow();
  });

  it('creates the directories if they do not exist', () => {
    existSyncSpy.mockReturnValue(false);
    fileHandler['_writePath'] = 'src/somedir/somedir/somefile.js';
    fileHandler.createDirs();
    expect(fs.mkdirSync).toHaveBeenLastCalledWith('src/somedir/somedir', { recursive: true });
  });

  it('gets a files directory path', () => {
    fileHandler['_writePath'] = 'src/somedir/somedir/somefile.js';
    expect(fileHandler.getWriteDirs()).toBe('src/somedir/somedir');
  });

  it('replaces a template value in a file given a TemplateModel', () => {
    expect(
      fileHandler
        .readFile()
        .replaceTemplateValue(new TemplateModel('replaceMe', 'replaced', mockStringifyTemplateModel)).fileContent
    ).toBe('Some content replaced replaced');
  });

  it('throws an error if attempting to replace a template value before reading a file.', () => {
    expect(() =>
      fileHandler.replaceTemplateValue(new TemplateModel('replaceMe', 'replaced', mockStringifyTemplateModel))
    ).toThrow();
  });

  it('replaces multiple values in a file string given an array of TemplateModel', () => {
    fileHandler.fileContent = mockTemplateStringMultiple;
    expect(
      fileHandler.replaceTemplateValues([
        new TemplateModel('firstReplacement', 'replaced', mockStringifyTemplateModel),
        new TemplateModel('secondReplacement', 'both values.', mockStringifyTemplateModel)
      ]).fileContent
    ).toBe('Some content replaced both values.');
  });
});
