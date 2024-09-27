/* tslint:disable only-arrow-functions no-unused-expression no-string-literal */

import sinon from 'sinon';
import { expect } from 'chai';

import PinoLogger from '../../../src/logger/pino';

describe('PinoLogger', function () {
  let container: any;
  let pinoInstance: any;

  beforeEach(function () {
    pinoInstance = {
      info: sinon.stub(),
      debug: sinon.stub(),
      error: sinon.stub(),
      warn: sinon.stub()
    };
    container = {
      pino: () => pinoInstance,
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('init', function () {
    it('should create a pino logger', function () {
      const pinoSpy = sinon.spy(container, 'pino');

      const logger = new PinoLogger(container);
      logger.init();

      expect(pinoSpy).to.have.been.calledOnce;
    });

    it('should options to logger creationt', function () {
      const pinoSpy = sinon.spy(container, 'pino');
      const options = { level: 'debug' };

      const logger = new PinoLogger(container);
      logger.init({ config: options });

      expect(pinoSpy).to.have.been.calledOnceWith(options);
    });
  });

  describe('info', function () {
    it('should call pino info', function () {
      const params = ['1', '2'];
      const logger = new PinoLogger(container);
      logger.init();

      logger.info('a', ...params);

      expect(pinoInstance.info).to.have.been.calledOnceWith('a', ...params);
    });
  });

  describe('debug', function () {
    it('should call pino debug', function () {
      const params = ['1', '2'];
      const logger = new PinoLogger(container);
      logger.init();

      logger.debug('a', ...params);

      expect(pinoInstance.debug).to.have.been.calledOnceWith('a', ...params);
    });
  });

  describe('error', function () {
    it('should call pino error', function () {
      const params = ['1', '2'];
      const logger = new PinoLogger(container);
      logger.init();

      logger.error('a', ...params);

      expect(pinoInstance.error).to.have.been.calledOnceWith('a', ...params);
    });
  });
});
