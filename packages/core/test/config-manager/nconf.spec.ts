/* tslint:disable only-arrow-functions no-unused-expression */

import NconfConfigManager from '../../src/config-manager/nconf';

describe('NconfConfigManager', function () {
  let container: any;

  beforeEach(function () {
    container = {
      nconf: {
        env: jest.fn().mockReturnThis(),
        file: jest.fn().mockReturnThis(),
        get: jest.fn(),
      },
      process: { env: { NODE_ENV: 'test' } },
    };
  });

  afterEach(function () {
    jest.restoreAllMocks();
  });

  describe('load', function () {
    it('should fill NODE_ENV if it is undefined', function () {
      container.process.env.NODE_ENV = undefined;

      const configService = new NconfConfigManager(container);
      configService.load({ path: '/foo/bar' });

      expect(container.process.env.NODE_ENV).toEqual('development');
    });

    it('should not fill NODE_ENV', function () {
      container.process.env.NODE_ENV = 'production';

      const configService = new NconfConfigManager(container);
      configService.load({ path: '/foo/bar' });

      expect(container.process.env.NODE_ENV).toEqual('production');
    });

    it('should load environment config', function () {
      const configService = new NconfConfigManager(container);
      configService.load({ path: '/foo/bar' });

      expect(container.nconf.file).toHaveBeenCalledTimes(2);
      expect(container.nconf.file).toHaveBeenCalledWith('environment', {
        file: '/foo/bar/test.json',
      });
      expect(container.nconf.file).toHaveBeenCalledWith('default', {
        file: '/foo/bar/default.json',
      });
    });

    it('should use default config path', function () {
      const configService = new NconfConfigManager(container);
      configService.load();

      expect(container.nconf.file).toHaveBeenCalledTimes(2);
      expect(container.nconf.file.mock.calls[0]).toEqual(['environment', {
        file: './config/test.json',
      }]);
      expect(container.nconf.file.mock.calls[1]).toEqual(['default', {
        file: './config/default.json',
      }]);
    });

    it('should load env', function () {
      const configService = new NconfConfigManager(container);
      configService.load();

      expect(container.nconf.env).toHaveBeenCalledTimes(1);
    });

    it('should load env before files', function () {
      const configService = new NconfConfigManager(container);
      configService.load();

      expect(container.nconf.env).toHaveBeenCalledBefore(container.nconf.file);
    });
  });

  describe('get', function () {
    it('should return nconf provider get', function () {
      const configService = new NconfConfigManager(container);
      const value = 'a';

      container.nconf.get.mockImplementation(() => value);
      const result = configService.get('prop');

      expect(container.nconf.get).toHaveBeenCalledWith('prop');
      expect(result).toEqual(value);
    });
  });
});
