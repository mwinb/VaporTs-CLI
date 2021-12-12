import { defaultStringify, jsonStringify } from '.';

describe('default stringify', () => {
  it('returns a string using the given value in string interpolation', () => {
    expect(defaultStringify(true)).toBe(`${true}`);
  });
});
describe('json stringify', () => {
  beforeEach(() => {
    jest.spyOn(JSON, 'stringify');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('calls json stringify on the provided value', () => {
    jsonStringify({ testField: 'testValue' });
    expect(JSON.stringify).toHaveBeenLastCalledWith({ testField: 'testValue' });
  });
});
