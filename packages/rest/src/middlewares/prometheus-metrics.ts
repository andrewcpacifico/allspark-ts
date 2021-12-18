import { Express as ExpressApp, Request } from 'express';
import expressPrometheusMiddleware from 'express-prometheus-middleware';

import { IConfigManager } from '@allspark-js/core';

type TPromMiddleware = typeof expressPrometheusMiddleware;

type TDependencies = {
  configManager: IConfigManager;
  prometheusMiddleware: TPromMiddleware;
};

export type TMetricsMiddlewareCreator = (app: ExpressApp) => void;

export default function promMetrics({
  configManager,
  prometheusMiddleware
}: TDependencies): TMetricsMiddlewareCreator {
  return (app: ExpressApp) => {
    const options = configManager.get('prometheusMetrics');
    options.authenticate = (req: Request) =>
      req.headers.authorization === `Basic ${configManager.get('PROMETHEUS_AUTH_TOKEN')}`

    app.use(prometheusMiddleware(options));
  };
}
