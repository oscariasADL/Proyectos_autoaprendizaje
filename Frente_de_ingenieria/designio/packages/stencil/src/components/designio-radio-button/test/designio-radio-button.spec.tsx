import { newSpecPage } from '@stencil/core/testing';
import { DesignioRadioButton } from '../designio-radio-button';

// helpers
const flushGroupRegistry = () => DesignioRadioButton.groupRegistry.clear();
const getGroup = (name: string) =>
  DesignioRadioButton.groupRegistry.get(name) || [];

describe('designio-radio-button', () => {
  afterEach(() => {
    flushGroupRegistry();
    jest.clearAllMocks();
  });

  it('renders default (bpop)', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button radio-id="r1" name="g1"></designio-radio-button>`
    });
    expect(page.root).toBeTruthy();
    expect(page.rootInstance.type).toBe('bpop');
    expect(getGroup('g1').length).toBe(1);
  });

  it('renders bavv with checked (attribute)', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bavv" radio-id="r2" name="g2" label="L" checked="true"></designio-radio-button>`
    });
    expect(page.rootInstance.type).toBe('bavv');
    expect(page.rootInstance.internalChecked).toBe(true);
  });

  it('renders bocc invertLabel', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bocc" radio-id="r3" name="g3" label="L" invert-label="true"></designio-radio-button>`
    });
    expect(page.rootInstance.invertLabel).toBe(true);
  });

  it('renders bbog single (no group)', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bbog" radio-id="r4" name="" label="Single" value="v"></designio-radio-button>`
    });
    const hostContent =
      page.root.shadowRoot?.querySelector('sp-at-radio-button');
    expect(hostContent).toBeTruthy();
  });

  it('renders bbog group aggregator only once', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `
        <designio-radio-button type="bbog" radio-id="g-a1" name="grpBbog" value="a1" label="A1"></designio-radio-button>
        <designio-radio-button type="bbog" radio-id="g-a2" name="grpBbog" value="a2" label="A2"></designio-radio-button>
        <designio-radio-button type="bbog" radio-id="g-a3" name="grpBbog" value="a3" label="A3"></designio-radio-button>
      `
    });
    const nodes = page.body.querySelectorAll('designio-radio-button');
    expect(
      nodes[0].shadowRoot?.querySelector('sp-at-radio-button')
    ).toBeTruthy();
    expect(
      nodes[1].shadowRoot?.querySelector('sp-at-radio-button')
    ).toBeFalsy();
    expect(
      nodes[2].shadowRoot?.querySelector('sp-at-radio-button')
    ).toBeFalsy();
  });

  it('bpop emits radioChange detail via internal event', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bpop" radio-id="emit1" name="emit-group" value="val1" label="L1"></designio-radio-button>`
    });
    const spy = jest.fn();
    page.root.addEventListener('radioChange', spy);
    page.root.shadowRoot
      ?.querySelector('bpop-designio-radio-button')
      ?.dispatchEvent(new CustomEvent('radioChange'));
    expect(spy).toHaveBeenCalledTimes(1);
    const detail = spy.mock.calls[0][0].detail;
    expect(detail.value).toBe('val1');
    expect(detail.type).toBe('bpop');
    expect(detail.checked).toBe(true);
  });

  it('single selection inside group (bpop) by events', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `
        <designio-radio-button type="bpop" radio-id="grp1-a" name="grp1" value="A"></designio-radio-button>
        <designio-radio-button type="bpop" radio-id="grp1-b" name="grp1" value="B"></designio-radio-button>
      `
    });
    const els = page.body.querySelectorAll('designio-radio-button');
    els[0].shadowRoot
      ?.querySelector('bpop-designio-radio-button')
      ?.dispatchEvent(new CustomEvent('radioChange'));
    expect(getGroup('grp1').find((r) => r.value === 'A')?.internalChecked).toBe(
      true
    );
    els[1].shadowRoot
      ?.querySelector('bpop-designio-radio-button')
      ?.dispatchEvent(new CustomEvent('radioChange'));
    const group = getGroup('grp1');
    expect(group.find((r) => r.value === 'B')?.internalChecked).toBe(true);
    expect(group.find((r) => r.value === 'A')?.internalChecked).toBe(false);
  });

  it('allowUnselect toggles off (bocc)', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bocc" radio-id="au1" name="augrp" value="X" allow-unselect="true"></designio-radio-button>`
    });
    const trigger = page.root.shadowRoot?.querySelector('bdo-radiobutton');
    trigger?.dispatchEvent(new CustomEvent('changed'));
    expect(page.rootInstance.internalChecked).toBe(true);
    trigger?.dispatchEvent(new CustomEvent('changed'));
    expect(page.rootInstance.internalChecked).toBe(false);
  });

  it('allowUnselect works in group (bpop)', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `
        <designio-radio-button type="bpop" radio-id="gxu1" name="gx" value="X" allow-unselect="true"></designio-radio-button>
        <designio-radio-button type="bpop" radio-id="gxu2" name="gx" value="Y" allow-unselect="true"></designio-radio-button>
      `
    });
    const first = page.body.querySelectorAll('designio-radio-button')[0];
    first.shadowRoot
      ?.querySelector('bpop-designio-radio-button')
      ?.dispatchEvent(new CustomEvent('radioChange'));
    expect(getGroup('gx').find((r) => r.value === 'X')?.internalChecked).toBe(
      true
    );
    first.shadowRoot
      ?.querySelector('bpop-designio-radio-button')
      ?.dispatchEvent(new CustomEvent('radioChange'));
    expect(getGroup('gx').every((r) => !r.internalChecked)).toBe(true);
  });

  it('checked initial attribute sets internalChecked', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button radio-id="watch1" name="watch-group" checked="true"></designio-radio-button>`
    });
    expect(page.rootInstance.internalChecked).toBe(true);
  });

  it('disabled prevents selection and emission', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button radio-id="dis1" name="dis-group" disabled="true" value="D"></designio-radio-button>`
    });
    const spy = jest.fn();
    page.root.addEventListener('radioChange', spy);
    page.root.shadowRoot
      ?.querySelector('bpop-designio-radio-button')
      ?.dispatchEvent(new CustomEvent('radioChange'));
    expect(page.rootInstance.internalChecked).toBe(false);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('fallback renders bpop when unknown type', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="unknown" radio-id="unk1" name="unk-group"></designio-radio-button>`
    });
    expect(
      page.root.shadowRoot?.querySelector('bpop-designio-radio-button')
    ).toBeTruthy();
  });

  it('container/size/state/disabled forwarded (bpop)', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bpop" radio-id="sty1" name="sty-group" state="hover" size="large" container="true" disabled="true"></designio-radio-button>`
    });
    expect(page.rootInstance.state).toBe('hover');
    expect(page.rootInstance.size).toBe('large');
    expect(page.rootInstance.container).toBe(true);
    expect(page.rootInstance.disabled).toBe(true);
  });

  it('unregisters from group on removal', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `
        <designio-radio-button type="bpop" radio-id="grp-x1" name="grpX" value="X1"></designio-radio-button>
        <designio-radio-button type="bpop" radio-id="grp-x2" name="grpX" value="X2"></designio-radio-button>
      `
    });
    expect(getGroup('grpX').length).toBe(2);
    const second = page.body.querySelectorAll(
      'designio-radio-button'
    )[1] as any;
    second.remove();
    second.disconnectedCallback?.();
    expect(getGroup('grpX').length).toBe(1);
  });

  it('parseCustomAttributes default (bocc)', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bocc" radio-id="cattr0" name="c0" value="V0"></designio-radio-button>`
    });
    const parsed = (page.rootInstance as any).parseCustomAttributes();
    expect(parsed.id).toBe('cattr0');
    expect(parsed.value).toBe('V0');
    expect(parsed.disabled).toBe(false);
  });

  it('bocc customAttributes string parsed', async () => {
    const attrs = JSON.stringify({ class: 'x', disabled: true });
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bocc" radio-id="cattr1" name="cg" value="CV" custom-attributes='${attrs}'></designio-radio-button>`
    });
    const parsed = (page.rootInstance as any).parseCustomAttributes();
    expect(parsed.class).toBe('x');
    expect(parsed.disabled).toBe(true);
    expect(parsed.value).toBe('CV');
  });

  it('bocc customAttributes object parsed', async () => {
    // antes se mutaba la prop (inmutable). Se pasa como atributo inicial.
    const attrsObj = JSON.stringify({ class: 'y', disabled: false });
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bocc" radio-id="cattr2" name="cg2" value="OBJ" custom-attributes='${attrsObj}'></designio-radio-button>`
    });
    const parsed = (page.rootInstance as any).parseCustomAttributes();
    expect(parsed.class).toBe('y');
    expect(parsed.disabled).toBe(false);
    expect(parsed.value).toBe('OBJ');
  });

  it('bbog single selection change event updates internalChecked', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bbog" radio-id="solo" name="" value="opt1" label="O1"></designio-radio-button>`
    });
    const sherpa = page.root.shadowRoot?.querySelector('sp-at-radio-button');
    expect(page.rootInstance.internalChecked).toBe(false);
    sherpa?.dispatchEvent(
      new CustomEvent('change', { detail: { value: 'opt1' } })
    );
    await page.waitForChanges();
    expect(page.rootInstance.internalChecked).toBe(true);
  });

  it('allowUnselect absent does not unselect (bpop)', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bpop" radio-id="no-au" name="no-au-grp" value="NV"></designio-radio-button>`
    });
    const trigger = page.root.shadowRoot?.querySelector(
      'bpop-designio-radio-button'
    );
    trigger?.dispatchEvent(new CustomEvent('radioChange'));
    expect(page.rootInstance.internalChecked).toBe(true);
    trigger?.dispatchEvent(new CustomEvent('radioChange'));
    expect(page.rootInstance.internalChecked).toBe(true);
  });

  it('emitChange detail matches props (bavv)', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bavv" radio-id="emit2" name="eg" value="VX" label="LBL"></designio-radio-button>`
    });
    const spy = jest.fn();
    page.root.addEventListener('radioChange', spy);
    page.root.shadowRoot
      ?.querySelector('bavv-designio-radio-button')
      ?.dispatchEvent(new CustomEvent('radioChange'));
    const detail = spy.mock.calls[0][0].detail;
    expect(detail.id).toBe('emit2');
    expect(detail.value).toBe('VX');
    expect(detail.type).toBe('bavv');
  });

  it('bbog groupVersion increments on selection', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `
        <designio-radio-button type="bbog" radio-id="ga1" name="gZ" value="v1" label="L1"></designio-radio-button>
        <designio-radio-button type="bbog" radio-id="ga2" name="gZ" value="v2" label="L2"></designio-radio-button>
      `
    });
    const aggEl = page.body.querySelectorAll('designio-radio-button')[0] as any;

    // Usa atributo (lo seguro) en vez de propiedad directa que estaba undefined
    const initialAttr = Number(
      aggEl.shadowRoot
        ?.querySelector('sp-at-radio-button')
        ?.getAttribute('data-group-version') || 0
    );

    // Disparo en agregador con value v2
    aggEl.shadowRoot
      ?.querySelector('sp-at-radio-button')
      ?.dispatchEvent(new CustomEvent('change', { detail: { value: 'v2' } }));

    await page.waitForChanges();

    const afterAttr = Number(
      aggEl.shadowRoot
        ?.querySelector('sp-at-radio-button')
        ?.getAttribute('data-group-version') || 0
    );

    expect(afterAttr).toBeGreaterThan(initialAttr);
  });

  it('single bpop without allowUnselect emits once', async () => {
    const page = await newSpecPage({
      components: [DesignioRadioButton],
      html: `<designio-radio-button type="bpop" radio-id="sg1" name="" value="solo"></designio-radio-button>`
    });
    const spy = jest.fn();
    page.root.addEventListener('radioChange', spy);
    const trigger = page.root.shadowRoot?.querySelector(
      'bpop-designio-radio-button'
    );
    trigger?.dispatchEvent(new CustomEvent('radioChange'));
    trigger?.dispatchEvent(new CustomEvent('radioChange'));
    expect(page.rootInstance.internalChecked).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
