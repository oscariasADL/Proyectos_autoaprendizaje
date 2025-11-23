describe('ADLConsole', () => {
  const originalConsole = { ...console };

  beforeEach(() => {
    (global as unknown as { window: { console: Console } }).window = {
      console
    };
    console.log = originalConsole.log;
    console.error = originalConsole.error;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('allows log in development by default', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({ environment: 'development' });
    instance.log('message');
    expect(logSpy).toHaveBeenCalledWith('message');
  });

  it('allows log when flag showInStage true in staging', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({
      environment: 'staging',
      showInStage: true
    });
    instance.log('allowed');
    expect(logSpy).toHaveBeenCalledWith('allowed');
  });

  it('allows log when showInProduction true and environment production', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({
      environment: 'production',
      showInProduction: true
    });
    instance.log('prod');
    expect(logSpy).toHaveBeenCalledWith('prod');
  });

  it('does not allow log when showInProduction false in production', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({
      environment: 'production',
      showInProduction: false
    });
    instance.log('blocked');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('singleton returns same instance', () => {
    const { ADLConsole } = require('./ADLConsole.class');
    const first = new ADLConsole({ environment: 'staging', showInStage: true });
    const second = new ADLConsole({
      environment: 'staging',
      showInStage: false
    });
    expect(first).toBe(second);
  });

  it('delegates error/info/warn when allowed', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({
      environment: 'staging',
      showInStage: true
    });
    instance.error('e1');
    instance.info('i1');
    instance.warn('w1');
    expect(errorSpy).toHaveBeenCalledWith('e1');
    expect(infoSpy).toHaveBeenCalledWith('i1');
    expect(warnSpy).toHaveBeenCalledWith('w1');
  });

  it('suppresses error/info/warn when not allowed', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({
      environment: 'staging',
      showInStage: false
    });
    instance.error('e1');
    instance.info('i1');
    instance.warn('w1');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('uses configcat async flag (production)', async () => {
    jest.resetModules();
    jest.doMock('../configcat/configcat.handler', () => {
      return {
        ConfigCatHandler: {
          getInstance: jest.fn(() => ({
            getFeatureFlag: jest.fn().mockResolvedValue(true)
          }))
        }
      };
    });
    const { ADLConsole: ADLConsoleMocked } = await import('./ADLConsole.class');
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const instance = new ADLConsoleMocked({
      environment: 'production',
      configCat: { configCatKey: 'k', productionFlag: 'prodFlag' },
      showInProduction: false
    });
    // Wait a tick for promise resolution
    await new Promise((r) => setTimeout(r, 100));
    instance.log('cfgcat');
    expect(logSpy).toHaveBeenCalledWith('cfgcat');
  });

  it('should allow log in development even when showInProduction is true', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({
      showInProduction: true,
      environment: 'development'
    });
    instance.log('message');
    expect(logSpy).toHaveBeenCalledWith('message');
  });

  it('should not allow log in staging when showInStage is false', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({
      environment: 'staging',
      showInStage: false
    });
    instance.log('blocked');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should reset instance on require when modules are reset', () => {
    const { ADLConsole: FirstADLConsole } = require('./ADLConsole.class');
    const firstInstance = new FirstADLConsole({ environment: 'development' });

    jest.resetModules();

    const { ADLConsole: SecondADLConsole } = require('./ADLConsole.class');
    const secondInstance = new SecondADLConsole({
      environment: 'staging',
      showInStage: true
    });

    // After resetModules, we should be able to create a new instance with different config
    expect(firstInstance).not.toBe(secondInstance);
  });

  it('should handle configcat flag for staging environment', async () => {
    jest.resetModules();
    jest.doMock('../configcat/configcat.handler', () => {
      return {
        ConfigCatHandler: {
          getInstance: jest.fn(() => ({
            getFeatureFlag: jest.fn().mockResolvedValue(false)
          }))
        }
      };
    });

    const { ADLConsole: ADLConsoleMocked } = await import('./ADLConsole.class');
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const instance = new ADLConsoleMocked({
      environment: 'staging',
      configCat: {
        configCatKey: 'test-key',
        productionFlag: 'prodFlag',
        stageFlag: 'stageFlag'
      },
      showInStage: true // This should be overridden by configCat flag
    });

    // Wait for async configcat resolution
    await new Promise((r) => setTimeout(r, 100));

    instance.log('should be blocked');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should use fallback config when showInStage is undefined in staging', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({
      environment: 'staging'
      // showInStage is undefined, should default to false
    });
    instance.log('should be blocked');
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('should use fallback config when showInProduction is undefined in production', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const { ADLConsole } = require('./ADLConsole.class');
    const instance = new ADLConsole({
      environment: 'production'
      // showInProduction is undefined, should default to false
    });
    instance.log('should be blocked');
    expect(logSpy).not.toHaveBeenCalled();
  });
});
