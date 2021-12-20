import promClient from 'prom-client';

import PrometheusRta from './prometheus';

export * from './rta';
export { PrometheusRta };
export * from './prometheus';
export const rta = new PrometheusRta({ promClient });
