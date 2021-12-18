type TLabel = {
  [labelName: string]: string;
};

export type TRtaIncArgs = {
  metric: string;
  value?: number;
  labels?: TLabel;
};

export type TRtaRecordArgs = {
  metric: string;
  value: number;
  labels?: TLabel;
};

export interface IRta {
  inc(args: TRtaIncArgs): void;
  record(args: TRtaRecordArgs): void;
}
