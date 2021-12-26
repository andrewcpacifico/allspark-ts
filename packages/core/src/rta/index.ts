import promClient from 'prom-client';

import PrometheusRta from './prometheus';
import { nconfConfigManager } from '../config-manager';

export * from './rta';
export { PrometheusRta };
export * from './prometheus';
export const rta = new PrometheusRta({
  configManager: nconfConfigManager,
  promClient,
});
