import express from 'express';
import { Joi, validate } from 'express-validation';
import moment from '@allspark-js/core/third-party/moment';

export type ExpressModule = typeof express;
export type ExpressValidator = {
  joi: JoiModule;
  validate: typeof validate;
};
export type JoiModule = typeof Joi;
export type MomentModule = typeof moment;

export const thirdPartyDependencies = {
  express,
  moment,
  validator: {
    joi: Joi,
    validate,
  },
};
