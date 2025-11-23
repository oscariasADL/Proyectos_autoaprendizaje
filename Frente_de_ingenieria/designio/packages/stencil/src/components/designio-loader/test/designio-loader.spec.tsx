import { newSpecPage } from '@stencil/core/testing';
import { DesignioLoader } from '../designio-loader';

describe('designio-loader', () => {
  it('should render with default type bbog', async () => {
    const page = await newSpecPage({
      components: [DesignioLoader],
      html: `<designio-loader label="Click me"></designio-loader>`
    });

    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot?.querySelector('sp-ml-loader')).toBeTruthy();
    expect(page.rootInstance.type).toBe('bbog');
  });

  it('should render with type bocc', async () => {
    const page = await newSpecPage({
      components: [DesignioLoader],
      html: `<designio-loader type="bocc" isopen="true"></designio-loader>`
    });

    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot?.querySelector('bdo-loading')).toBeTruthy();
    expect(page.rootInstance.type).toBe('bocc');
  });

  it('should render with type bpop', async () => {
    const page = await newSpecPage({
      components: [DesignioLoader],
      html: `<designio-loader type="bpop" isopen="true"></designio-loader>`
    });

    expect(page.root).toBeTruthy();
    expect(
      page.root.shadowRoot?.querySelector('bpop-designio-loader')
    ).toBeTruthy();
    expect(page.rootInstance.type).toBe('bpop');
  });

  it('should render with type bavv', async () => {
    const page = await newSpecPage({
      components: [DesignioLoader],
      html: `<designio-loader type="bavv" label="Click me"></designio-loader>`
    });

    expect(page.root).toBeTruthy();
    expect(
      page.root.shadowRoot?.querySelector('bavv-designio-spinner')
    ).toBeTruthy();
    expect(page.rootInstance.type).toBe('bavv');
  });
});
