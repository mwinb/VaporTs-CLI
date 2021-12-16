import { TemplateFile } from '.';

export interface InstallerConfig {
  templateFiles: TemplateFile[];
  dependencies: string[];
  devDependencies: string[];
}

export default InstallerConfig;
