import * as fs from 'fs';
import TemplateBuilder from './TemplateBuilder';
import TemplateFile from '../Interfaces/TemplateFile.Interface';

const mockTemplateContent = 'Some content {{ replaceMe }} {{ replaceMe }}';

describe('template builder', () => {
  let templateBuilder: TemplateBuilder;
  let mockFiles: TemplateFile[];

  beforeEach(() => {
    mockFiles = [{ inPath: 'templates/shared/directCopy.tmpl', outPath: 'src/directCopy.js' }];
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockTemplateContent);
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
    expect(templateBuilder.readTemplate(mockFiles[0])).toBe(mockTemplateContent);
  });

  it('writes a template given a template file and content to write', () => {
    templateBuilder.writeTemplate(mockFiles[0], mockTemplateContent);
    expect(fs.writeFileSync).toHaveBeenLastCalledWith('src/directCopy.js', mockTemplateContent);
  });

  it('replaces template values in a string given an json object model', () => {
    expect(templateBuilder.replaceTemplateValues({ replaceMe: 'replaced' }, mockTemplateContent)).toBe(
      'Some content replaced replaced'
    );
  });
});
