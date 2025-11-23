import { newSpecPage } from '@stencil/core/testing';
import { DesignioFooter } from '../designio-footer';
import { FooterDesignioVariant } from '../designio-footer.enum';

describe('designio-footer', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders the component base wrapper', async () => {
    const page = await newSpecPage({
      components: [DesignioFooter],
      html: `<designio-footer></designio-footer>`
    });

    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('div')).toBeTruthy();
  });

  it('renders BPOP (div empty)', async () => {
    const page = await newSpecPage({
      components: [DesignioFooter],
      html: `<designio-footer type="bpop"></designio-footer>`
    });

    const div = page.root.shadowRoot.querySelector('div > div');
    expect(div).not.toBeNull();
    expect(div.textContent).toBe('');
  });

  it('renders BBOG (div empty)', async () => {
    const page = await newSpecPage({
      components: [DesignioFooter],
      html: `<designio-footer type="bbog"></designio-footer>`
    });

    const div = page.root.shadowRoot.querySelector('div > div');
    expect(div).not.toBeNull();
  });

  it('renders BAVV DEFAULT variant', async () => {
    const page = await newSpecPage({
      components: [DesignioFooter],
      html: `<designio-footer type="bavv" variant="default"></designio-footer>`
    });

    const footer = page.root.shadowRoot.querySelector('bavv-designio-footer');
    expect(footer).not.toBeNull();
    expect(footer.getAttribute('variant')).toBe('default');
  });

  it('renders BOCC without icons', async () => {
    const page = await newSpecPage({
      components: [DesignioFooter],
      html: `<designio-footer type="bocc" element-id="test-id"></designio-footer>`
    });

    const footer = page.root.shadowRoot.querySelector('bdo-footer-company');
    expect(footer).not.toBeNull();
    expect(footer.getAttribute('elementid')).toBe('test-id');

    // No slots should be rendered
    expect(page.root.shadowRoot.querySelector('[slot="icon-left"]')).toBeNull();
    expect(
      page.root.shadowRoot.querySelector('[slot="icon-right"]')
    ).toBeNull();
  });

  it('renders BOCC with only icon-left slot', async () => {
    const page = await newSpecPage({
      components: [DesignioFooter],
      html: `
        <designio-footer type="bocc" element-id="footer-left">
          <img slot="icon-left" src="./icon-left.svg" />
        </designio-footer>
      `
    });

    const leftSlot = page.root.shadowRoot.querySelector('[slot="icon-left"]');
    expect(leftSlot).not.toBeNull();

    const rightSlot = page.root.shadowRoot.querySelector('[slot="icon-right"]');
    expect(rightSlot).toBeNull();
  });

  it('renders BOCC with only icon-right slot', async () => {
    const page = await newSpecPage({
      components: [DesignioFooter],
      html: `
        <designio-footer type="bocc" element-id="footer-right">
          <img slot="icon-right" src="./icon-right.svg" />
        </designio-footer>
      `
    });

    const rightSlot = page.root.shadowRoot.querySelector('[slot="icon-right"]');
    expect(rightSlot).not.toBeNull();
    const leftSlot = page.root.shadowRoot.querySelector('[slot="icon-left"]');
    expect(leftSlot).toBeNull();
  });

  it('renders BOCC with both icons', async () => {
    const page = await newSpecPage({
      components: [DesignioFooter],
      html: `
        <designio-footer type="bocc" element-id="footer-both">
          <img slot="icon-left" src="./icon-left.svg" />
          <img slot="icon-right" src="./icon-right.svg" />
        </designio-footer>
      `
    });

    expect(
      page.root.shadowRoot.querySelector('[slot="icon-left"]')
    ).not.toBeNull();
    expect(
      page.root.shadowRoot.querySelector('[slot="icon-right"]')
    ).not.toBeNull();
  });

  it('uses FooterDesignioVariant enum internally', async () => {
    const comp = new DesignioFooter();
    expect(comp.variant).toBe(FooterDesignioVariant.DEFAULT);
  });

  it('calls footerMap renderer for each type', async () => {
    const types: any[] = ['bavv', 'bocc', 'bpop', 'bbog'];

    for (const type of types) {
      const page = await newSpecPage({
        components: [DesignioFooter],
        html: `<designio-footer type="${type}"></designio-footer>`
      });

      const wrapper = page.root.shadowRoot.querySelector('div');
      expect(wrapper).not.toBeNull();
    }
  });
});
