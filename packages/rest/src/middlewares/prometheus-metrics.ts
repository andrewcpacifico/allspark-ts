import { Application as ExpressApp } from 'express';
import expressPrometheusMiddleware from 'express-prometheus-middleware';

type TPromMiddleware = typeof expressPrometheusMiddleware;

type TDependencies = {
  prometheusMiddleware: TPromMiddleware;
};

export type TMetricsMiddlewareCreator = (app: ExpressApp) => void;

export default function promMetrics({ prometheusMiddleware }: TDependencies): TMetricsMiddlewareCreator {
  return (app: ExpressApp) => {
    app.use(prometheusMiddleware({}));
  };
}
