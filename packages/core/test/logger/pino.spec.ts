/* tslint:disable only-arrow-functions no-unused-expression no-string-literal */

import PinoLogger from '../../src/logger/pino';

describe('PinoLogger', function () {
  let container: any;
  let pinoInstance: any;

  beforeEach(function () {
    pinoInstance = {
      info: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    };
    container = {
      pino: jest.fn().mockReturnValue(pinoInstance),
    };
  });

  afterEach(function () {
    jest.restoreAllMocks();
  });

  describe('init', function () {
    it('should create a pino logger', function () {
      const logger = new PinoLogger(container);
      logger.init();

      expect(container.pino).toHaveBeenCalledOnce();
    });

    it('should options to logger creation', function () {
      const options = { level: 'debug' };

      const logger = new PinoLogger(container);
      logger.init({ config: options });

      expect(container.pino)
        .toHaveBeenCalledOnce()
        .toHaveBeenCalledWith(options);
    });
  });

  describe('info', function () {
    it('should call pino info', function () {
      const params = ['1', '2'];
      const logger = new PinoLogger(container);
      logger.init();

      logger.info('a', ...params);

      expect(pinoInstance.info)
        .toHaveBeenCalledExactlyOnceWith('a', ...params);
    });
  });

  describe('debug', function () {
    it('should call pino debug', function () {
      const params = ['1', '2'];
      const logger = new PinoLogger(container);
      logger.init();

      logger.debug('a', ...params);

      expect(pinoInstance.debug)
        .toHaveBeenCalledExactlyOnceWith('a', ...params);
    });
  });

  describe('error', function () {
    it('should call pino error', function () {
      const params = ['1', '2'];
      const logger = new PinoLogger(container);
      logger.init();

      logger.error('a', ...params);

      expect(pinoInstance.error)
        .toHaveBeenCalledExactlyOnceWith('a', ...params);
    });
  });
});
