import express from 'express';
import { Joi, validate } from 'express-validation';

export type ExpressModule = typeof express;
export type ExpressValidator = {
  joi: JoiModule;
  validate: typeof validate;
};
export type JoiModule = typeof Joi;

export const thirdPartyDependencies = {
  express,
  validator: {
    joi: Joi,
    validate,
  },
};
