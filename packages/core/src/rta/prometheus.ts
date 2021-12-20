import promClientModule, { Counter, Histogram, Metric } from 'prom-client';

import { IRta, TRtaIncArgs, TRtaRecordArgs } from './rta';

type PromClient = typeof promClientModule;

type TDependencies = {
  promClient: PromClient;
};

type TMetricType = 'counter' | 'histogram';
type TPromMetric = Metric<string>;
type TLabel = {[key: string]: string};
type TMetric = {
  name: string;
  help: string;
  labelNames?: string[];
};
type TMetricIndex = {
  counter: {[key: string]: {
    instance: TPromMetric;
    labelNames: string[];
  }};
  histogram: {[key: string]: {
    instance: TPromMetric;
    labelNames: string[];
  }};
};

export default class PrometheusRta implements IRta {
  private metrics: TMetricIndex = {
    counter: {},
    histogram: {},
  };

  constructor(private deps: TDependencies) {}

  private createPromMetric({ type, metricData }: {
    type: TMetricType,
    metricData: TMetric,
  }): TPromMetric {
    const { promClient } = this.deps;

    if (type === 'counter') {
      return new promClient.Counter(metricData);
    }

    return new promClient.Histogram(metricData);
  }

  private getMetric({ type, name, labels = {}}: {
    type: TMetricType,
    name: string,
    labels?: TLabel,
  }) {
    const metric = this.metrics[type];

    const labelNames = Object.keys(labels);
    const metricData: TMetric = {
      name,
      help: name,
    };

    if (labels) {
      metricData.labelNames = labelNames;
    }

    if (!metric[name]) {
      metric[name] = {
        instance: this.createPromMetric({ type, metricData }),
        labelNames,
      };
    }

    return metric[name].instance;
  }

  inc({ metric, labels, value = 1 }: TRtaIncArgs): void {
    const promMetric: Counter<string> = this.getMetric({
      type: 'counter',
      name: metric,
      labels,
    }) as Counter<string>;

    promMetric.inc(value);
  }

  record({ metric, labels, value }: TRtaRecordArgs): void {
    const promMetric: Histogram<string> = this.getMetric({
      type: 'histogram',
      name: metric,
      labels,
    }) as Histogram<string>;

    promMetric.observe(value);
  }
}
