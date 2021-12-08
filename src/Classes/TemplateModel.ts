import { TemplateValue, StringifyTemplateValue } from '../Types';

export class TemplateModel {
  static factory(valueObj: Record<string, TemplateValue>, method: StringifyTemplateValue): TemplateModel[] {
    return Object.keys(valueObj).map(key => new TemplateModel(key, valueObj[key], method));
  }

  constructor(public key: string, public value: TemplateValue, private stringifyMethod: StringifyTemplateValue) {}

  stringify(): string {
    return this.stringifyMethod(this.value);
  }
}

export default TemplateModel;
