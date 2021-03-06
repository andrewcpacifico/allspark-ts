/* tslint:disable only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import sinon from 'sinon';

import NconfConfigManager from '../../../src/config-manager/nconf';

describe('NconfConfigManager', function () {
  let container: any;

  beforeEach(function () {
    container = {
      nconf: {
        env: sinon.stub().returnsThis(),
        file: sinon.stub().returnsThis(),
        get: sinon.stub(),
      },
      process: { env: { NODE_ENV: 'test' } },
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('load', function () {
    it('should fill NODE_ENV if it is undefined', function () {
      container.process.env.NODE_ENV = undefined;

      const configService = new NconfConfigManager(container);
      configService.load({ path: '/foo/bar' });

      expect(container.process.env.NODE_ENV)
        .to
        .be
        .equal('development');
    });

    it('should not fill NODE_ENV', function () {
      container.process.env.NODE_ENV = 'production';

      const configService = new NconfConfigManager(container);
      configService.load({ path: '/foo/bar' });

      expect(container.process.env.NODE_ENV)
        .to
        .be
        .equal('production');
    });

    it('should load environment config', function () {
      const configService = new NconfConfigManager(container);
      configService.load({ path: '/foo/bar' });

      expect(container.nconf.file).to.have.been.calledTwice;
      expect(container.nconf.file.firstCall).to.have.been.calledWith('environment', {
        file: '/foo/bar/test.json',
      });
      expect(container.nconf.file.secondCall).to.have.been.calledWith('default', {
        file: '/foo/bar/default.json',
      });
    });

    it('should use default config path', function () {
      const configService = new NconfConfigManager(container);
      configService.load();

      expect(container.nconf.file).to.have.been.calledTwice;
      expect(container.nconf.file.firstCall).to.have.been.calledWith('environment', {
        file: './config/test.json',
      });
      expect(container.nconf.file.secondCall).to.have.been.calledWith('default', {
        file: './config/default.json',
      });
    });

    it('should load env', function () {
      const configService = new NconfConfigManager(container);
      configService.load();

      expect(container.nconf.env).to.have.been.calledOnce;
    });

    it('should load env before files', function () {
      const configService = new NconfConfigManager(container);
      configService.load();

      expect(container.nconf.env).to.have.been.calledBefore(container.nconf.file);
    });
  });

  describe('get', function () {
    it('should return nconf provider get', function () {
      const configService = new NconfConfigManager(container);
      const value = 'a';

      container.nconf.get.returns(value);
      const result = configService.get('prop');

      expect(container.nconf.get)
        .to
        .have
        .been
        .calledOnceWith('prop');

      expect(result).to.be.equal(value);
    });
  });
});
