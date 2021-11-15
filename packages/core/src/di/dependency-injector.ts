export enum DependencyType {
  CLASS,
  FUNCTION,
  VALUE,
}

export type RegisterArgs = {
  name: string;
  dependency: any;
  type?: DependencyType;
  singleton?: boolean;
};

export type LoadModulesArgs = {
  path: string;
  suffix?: string;
  index?: string;
};

export interface IDependencyInjector {
  initialize(): void;
  loadModules(args: LoadModulesArgs): string[];
  register(args: RegisterArgs[]): void;
  registerThirdPartyDependencies(dependencies: {[key: string]: any}): void;
}
