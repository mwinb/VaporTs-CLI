import * as fs from 'fs';
import { TemplateValue } from '../Types';
import { TemplateFile } from '../Interfaces';
import { TemplateBuilder, TemplateModel } from '.';

const mockStringifyTemplateModel = (val: TemplateValue) => `${val}`;
const mockTemplateStringSingle = 'Some content {{ replaceMe }} {{ replaceMe }}';
const mockTemplateStringMultiple = 'Some content {{ firstReplacement }} {{ secondReplacement }}';

describe('template builder', () => {
  let mockFiles: TemplateFile[];
  let templateBuilder: TemplateBuilder;

  beforeEach(() => {
    mockFiles = [{ inPath: 'templates/shared/directCopy.tmpl', outPath: 'src/directCopy.js' }];
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockTemplateStringSingle);
    jest.spyOn(fs, 'writeFileSync').mockImplementation();
    jest.spyOn(fs, 'copyFileSync').mockImplementation();
    templateBuilder = new TemplateBuilder('bin/');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('gets template path given a file', () => {
    expect(templateBuilder.getTemplatePath(mockFiles[0])).toBe('bin/templates/shared/directCopy.tmpl');
  });

  it('copies a template given a template file', () => {
    templateBuilder.copyTemplateFile(mockFiles[0]);
    expect(fs.copyFileSync).toHaveBeenLastCalledWith('bin/templates/shared/directCopy.tmpl', 'src/directCopy.js');
  });

  it('reads a template given a template file', () => {
    expect(templateBuilder.readTemplate(mockFiles[0])).toBe(mockTemplateStringSingle);
  });

  it('writes a template given a template file and content to write', () => {
    templateBuilder.writeTemplate(mockFiles[0], mockTemplateStringSingle);
    expect(fs.writeFileSync).toHaveBeenLastCalledWith('src/directCopy.js', mockTemplateStringSingle);
  });

  it('replaces a template value in a string given a TemplateModel', () => {
    expect(
      templateBuilder.replaceTemplateValue(
        new TemplateModel('replaceMe', 'replaced', mockStringifyTemplateModel),
        mockTemplateStringSingle
      )
    ).toBe('Some content replaced replaced');
  });

  it('replaces multiple values in a template string given an array of TemplateModel', () => {
    expect(
      templateBuilder.replaceTemplateValues(
        [
          new TemplateModel('firstReplacement', 'replaced', mockStringifyTemplateModel),
          new TemplateModel('secondReplacement', 'both values.', mockStringifyTemplateModel)
        ],
        mockTemplateStringMultiple
      )
    ).toBe('Some content replaced both values.');
  });
});
