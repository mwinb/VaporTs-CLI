import { StringifyTemplateValue, TemplateValue } from '../Types';

export const defaultStringify: StringifyTemplateValue = (value: TemplateValue) => `${value}`;
export const jsonStringify: StringifyTemplateValue = (value: TemplateValue) => JSON.stringify(value);
