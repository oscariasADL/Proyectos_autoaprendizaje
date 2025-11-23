import { newSpecPage } from '@stencil/core/testing';
import { DesignioBadge } from '../designio-badge';

describe('designio-badge', () => {
  // RENDER BÁSICO
  it('should render with default type bbog', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge label="Default"></designio-badge>`
    });

    expect(page.root).toBeTruthy();
    expect(page.rootInstance.type).toBe('bbog');
    const tag = page.root.shadowRoot?.querySelector('sp-at-tag');
    expect(tag).toBeTruthy();
    expect(tag?.getAttribute('idEl')).toBe('bbog-badge');
    expect(tag?.getAttribute('text')).toBe('Default');
  });

  it('should render bbog with solid true', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bbog" label="Sólido" variant="positivo" is-solid="true"></designio-badge>`
    });
    const el = page.root.shadowRoot?.querySelector('sp-at-tag');
    expect(el).toBeTruthy();
  });

  it('should not render BOCC when visible is false or omitted', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bocc" label="Hidden"></designio-badge>`
    });
    const el = page.root.shadowRoot?.querySelector('bdo-badge');
    expect(el).toBeNull();
  });

  it('should use host id when idBadge is not provided (bpop click emits)', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge id="host-1" type="bpop" label="HostId"></designio-badge>`
    });
    const spy = jest.fn();
    page.win.addEventListener('badgeClicked', spy);

    const el = page.root.shadowRoot?.querySelector('bpop-designio-badge');
    el?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bpop',
          id: 'host-1',
          label: 'HostId'
        })
      })
    );
  });

  // RENDER POR TIPO
  it('should render bpop badge type', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bpop" label="BPOP" variant="success" size="medium" prefix-icon="plus" suffix-icon="check"></designio-badge>`
    });

    const el = page.root.shadowRoot?.querySelector('bpop-designio-badge');
    expect(el).toBeTruthy();
    expect(el?.getAttribute('idBadge')).toBe('bpop-badge');
    expect(el?.getAttribute('visualState')).toBe('success');
    expect(el?.getAttribute('badgeSize')).toBe('medium');
    expect(el?.getAttribute('prefixIcon')).toBe('plus');
    expect(el?.getAttribute('suffixIcon')).toBe('check');
    expect(el?.textContent?.trim()).toBe('BPOP');
  });

  it('should render bocc badge type', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bocc" label="BOCC" class-names="extra" prefix-icon="info" is-visible="true" variant="green" size="large" is-square="true"></designio-badge>`
    });

    const el = page.root.shadowRoot?.querySelector('bdo-badge');
    expect(el).toBeTruthy();
    expect(el?.getAttribute('elementId')).toBe('bocc-badge');
    expect(el?.getAttribute('classNames')).toBe('extra');
    expect(el?.getAttribute('icon')).toBe('info');
    expect(el?.hasAttribute('visible')).toBe(true);
    expect(el?.getAttribute('message')).toBe('BOCC');
    expect(el?.getAttribute('badgeType')).toBe('green');
    expect(el?.getAttribute('size')).toBe('large');
    expect(el?.hasAttribute('square')).toBe(true);
  });

  it('should render bavv badge type', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bavv" label="BAVV" variant="success" shape="rounded"></designio-badge>`
    });

    const el = page.root.shadowRoot?.querySelector('bavv-designio-badge');
    expect(el).toBeTruthy();
    expect(el?.getAttribute('variant')).toBe('success');
    expect(el?.getAttribute('shape')).toBe('rounded');
    expect(el?.textContent?.trim()).toBe('BAVV');
  });

  // EVENTOS
  it('should emit badgeClicked for bbog on atCloseTag', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge id-badge="bbog-1" label="Click me"></designio-badge>`
    });

    const spy = jest.fn();
    page.win.addEventListener('badgeClicked', spy);

    const el = page.root.shadowRoot?.querySelector('sp-at-tag');
    el?.dispatchEvent(new CustomEvent('atCloseTag', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bbog',
          id: 'bbog-1',
          label: 'Click me'
        })
      })
    );
  });

  it('should emit badgeClicked for bpop on click', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bpop" id-badge="bpop-1" label="Bpop"></designio-badge>`
    });

    const spy = jest.fn();
    page.win.addEventListener('badgeClicked', spy);

    const el = page.root.shadowRoot?.querySelector('bpop-designio-badge');
    el?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bpop',
          id: 'bpop-1',
          label: 'Bpop'
        })
      })
    );
  });

  it('should emit badgeClicked for bocc on click', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bocc" id-badge="bocc-1" label="Bocc" is-visible="true"></designio-badge>`
    });

    const spy = jest.fn();
    page.win.addEventListener('badgeClicked', spy);

    const el = page.root.shadowRoot?.querySelector('bdo-badge');
    el?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bocc',
          id: 'bocc-1',
          label: 'Bocc'
        })
      })
    );
  });

  it('should emit badgeClicked for bavv on click', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bavv" id-badge="bavv-1" label="Bavv"></designio-badge>`
    });

    const spy = jest.fn();
    page.win.addEventListener('badgeClicked', spy);

    const el = page.root.shadowRoot?.querySelector('bavv-designio-badge');
    el?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bavv',
          id: 'bavv-1',
          label: 'Bavv'
        })
      })
    );
  });

  // SLOT Y LABEL
  it('should use slot content when label is not provided', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bavv"><span>Desde slot</span></designio-badge>`
    });

    const slotEl = page.root.shadowRoot?.querySelector(
      'bavv-designio-badge > slot'
    );
    expect(slotEl).toBeTruthy();
  });

  it('should use slot content when label is not provided (bpop)', async () => {
    const page = await newSpecPage({
      components: [DesignioBadge],
      html: `<designio-badge type="bpop"><span>Slot BPOP</span></designio-badge>`
    });

    const slotEl = page.root.shadowRoot?.querySelector(
      'bpop-designio-badge > slot'
    );
    expect(slotEl).toBeTruthy();
  });

  // IDS POR DEFECTO
  it('should use default IDs for each type when id not provided', async () => {
    const map = [
      {
        type: 'bocc',
        selector: 'bdo-badge',
        attr: 'elementId',
        id: 'bocc-badge'
      },
      {
        type: 'bpop',
        selector: 'bpop-designio-badge',
        attr: 'idBadge',
        id: 'bpop-badge'
      },
      { type: 'bbog', selector: 'sp-at-tag', attr: 'idEl', id: 'bbog-badge' }
    ];

    for (const cfg of map) {
      const html =
        cfg.type === 'bocc'
          ? `<designio-badge type="${cfg.type}" label="X" is-visible="true"></designio-badge>`
          : `<designio-badge type="${cfg.type}" label="X"></designio-badge>`;
      const page = await newSpecPage({ components: [DesignioBadge], html });

      const el = page.root.shadowRoot?.querySelector(cfg.selector);
      expect(el?.getAttribute(cfg.attr)).toBe(cfg.id);
    }
  });
});
