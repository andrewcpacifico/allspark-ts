export type TConfigLoadArgs = {
  path?: string;
};
export interface IConfigManager {
  get(property: string): any;
  load(args?: TConfigLoadArgs): void;
}
