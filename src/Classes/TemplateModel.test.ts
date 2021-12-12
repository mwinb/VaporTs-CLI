import { TemplateModel } from '.';
import { StringifyTemplateValue, TemplateValue } from '../Types';

describe('Template Model', () => {
  let templateModel: TemplateModel;
  let stringifyTemplateValue: StringifyTemplateValue;

  beforeEach(() => {
    stringifyTemplateValue = jest.fn();
    templateModel = new TemplateModel('someKey', 'someValue', stringifyTemplateValue);
  });

  afterEach(() => {
    jest.restoreAllMocks;
  });
  it('calls the provided StringifyTemplateValue method when stringify is called', () => {
    templateModel.stringify();
    expect(stringifyTemplateValue).toHaveBeenCalledWith('someValue');
  });

  it('returns an array of TemplateModel objects given a key value record and a stringify method', () => {
    const pureModel = { propOne: 'valOne', propTwo: false };
    const templateModels = TemplateModel.factory(pureModel, (val: TemplateValue) => `${val}`);
    expect(templateModels[0].stringify()).toBe('valOne');
    expect(templateModels[1].stringify()).toBe('false');
  });

  it('uses the default stringify method when none is passed to the factory', () => {
    const mockValue = { sub: { field: 'value' } };
    const templateModels = TemplateModel.factory(mockValue);
    expect(templateModels[0].stringify()).toEqual(`${mockValue.sub}`);
  });

  it('uses an empty string when the provided field is undefined or null', () => {
    const pureModel = { propTwo: undefined };
    const templateModels = TemplateModel.factory(pureModel, (val: TemplateValue) => `${val}`);
    expect(templateModels[0].value).toEqual('');
  });
});
