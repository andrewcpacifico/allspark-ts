export interface IConfigManager {
  get(property: string): any;
  load({ path }: { path: string }): void;
}
