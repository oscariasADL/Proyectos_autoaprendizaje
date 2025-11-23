import { newSpecPage } from '@stencil/core/testing';
import { DesignioDropdown } from '../designio-dropdown';

async function createInstance(
  html = `<designio-dropdown></designio-dropdown>`
) {
  const page = await newSpecPage({
    components: [DesignioDropdown],
    html
  });

  const instance = page.rootInstance as any;

  instance._bbogRef = {
    setValue: jest.fn()
  };

  return { page, instance };
}

describe('designio-dropdown', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should render correctly', async () => {
    const { page } = await createInstance();
    expect(page.root).toBeDefined();
    expect(page.root.tagName.toLowerCase()).toBe('designio-dropdown');
  });

  it('should map BBOG options correctly', async () => {
    const mock = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 }
    ];
    const { instance } = await createInstance();
    const mapped = (instance as any).mapBbogOptions(mock);
    expect(mapped).toEqual([
      { text: 'One', value: '1' },
      { text: 'Two', value: '2' }
    ]);
  });

  it('should return expected typeStatus in mapFieldStatus', async () => {
    const { page } = await createInstance();
    page.root!.setAttribute('state', 'error');
    await page.waitForChanges();
    expect(page.rootInstance['mapFieldStatus']()).toBe('error');
    page.root!.setAttribute('state', 'warning');
    await page.waitForChanges();
    expect(page.rootInstance['mapFieldStatus']()).toBe('warning');
    page.root!.setAttribute('state', 'default');
    await page.waitForChanges();
    expect(page.rootInstance['mapFieldStatus']()).toBe('null');
  });

  it('should return HELP when isHelp is true', async () => {
    const { page } = await createInstance();
    page.root!.setAttribute('is-help', 'true');
    await page.waitForChanges();
    expect(page.rootInstance['mapBbogStatus']()).toBe('HELP');
  });

  it('should emit event when onSelect is called', async () => {
    const { instance } = await createInstance();
    const spy = jest.fn();
    instance.selectionChange.emit = spy as any;
    (instance as any).onSelect({ value: 'X' });

    expect(spy).toHaveBeenCalledWith({ value: 'X' });
  });

  it('should enrich Villas event with correct label', async () => {
    const { page } = await createInstance();
    page.root!.setAttribute(
      'options',
      JSON.stringify([
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 }
      ])
    );
    await page.waitForChanges();
    const spy = jest.spyOn(page.rootInstance as any, 'onSelect');
    (page.rootInstance as any).handleBavvSelect({ detail: 2 } as CustomEvent);
    expect(spy).toHaveBeenCalledWith({ value: 2, label: 'Two' });
  });

  it('should forward BPOP event unchanged', async () => {
    const { instance } = await createInstance();
    const spy = jest.spyOn(instance as any, 'onSelect');
    const detail = { value: '3', name: 'test', label: 'Option 3' };
    (instance as any).handleBpopSelect({ detail } as CustomEvent);
    expect(spy).toHaveBeenCalledWith(detail);
  });

  it('should forward BOCC event unchanged', async () => {
    const { instance } = await createInstance();
    const spy = jest.spyOn(instance as any, 'onSelect');
    const op = { id: '1', value: 'Option 1' };
    (instance as any).handleBoccSelect({ detail: op } as CustomEvent);
    expect(spy).toHaveBeenCalledWith(op);
  });

  it('should forward BBOG event unchanged', async () => {
    const { instance } = await createInstance();
    const spy = jest.spyOn(instance as any, 'onSelect');
    const d = { value: 'A', text: 'Text A' };
    (instance as any).handleBbogSelect({ detail: d } as CustomEvent);
    expect(spy).toHaveBeenCalledWith(d);
  });

  it('should map BOCC options correctly', async () => {
    const { page } = await createInstance();
    page.root!.setAttribute(
      'options',
      JSON.stringify([
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 }
      ])
    );
    await page.waitForChanges();
    const mapped = (page.rootInstance as any).mapBoccOptions();
    expect(mapped[0]).toHaveProperty('id');
    expect(mapped[0]).toHaveProperty('value');
  });

  it('should return selected BOCC option', async () => {
    const { page } = await createInstance();
    page.root!.setAttribute('value', '2');
    await page.waitForChanges();
    const opts = [
      { id: '1', value: 'One' },
      { id: '2', value: 'Two' }
    ];
    const selected = (page.rootInstance as any).getBoccSelectedOption(opts);
    expect(selected).toEqual({ id: '2', value: 'Two' });
  });

  it('should capture internal BPOP events in componentDidLoad', async () => {
    const { page, instance } = await createInstance(
      `<designio-dropdown type="bpop"></designio-dropdown>`
    );
    const mockEl = document.createElement('bpop-designio-dropdown');
    const spy = jest.spyOn(instance as any, 'onSelect');
    (page.root!.shadowRoot as any) = { querySelector: () => mockEl };
    instance.componentDidLoad();
    mockEl.dispatchEvent(
      new CustomEvent('selectionChange', {
        detail: { value: 'X', label: 'L' }
      })
    );
    expect(spy).toHaveBeenCalledWith({ value: 'X', label: 'L' });
  });

  it('should capture internal BAVV events in componentDidLoad', async () => {
    const { page, instance } = await createInstance(
      `<designio-dropdown type="bavv"></designio-dropdown>`
    );
    const mockEl = document.createElement('bavv-designio-dropdown');
    const spy = jest.spyOn(instance as any, 'onSelect');
    (page.root!.shadowRoot as any) = { querySelector: () => mockEl };
    instance.componentDidLoad();
    mockEl.dispatchEvent(new CustomEvent('selectionChange', { detail: '2' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should return DISABLED in mapBbogStatus', async () => {
    const { page } = await createInstance();
    page.root!.setAttribute('is-disabled', 'true');
    await page.waitForChanges();
    expect(page.rootInstance['mapBbogStatus']()).toBe('DISABLED');
  });

  it('should not call setValue when value is null', async () => {
    const { page, instance } = await createInstance();
    page.root!.setAttribute('type', 'bbog');
    page.root!.removeAttribute('value');
    await page.waitForChanges();
    const spy = jest.fn();
    (instance as any)._bbogRef = { setValue: spy };
    (instance as any).applyBbogValue();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render BPOP correctly', async () => {
    const { page } = await createInstance(
      `<designio-dropdown type="bpop"></designio-dropdown>`
    );
    expect(
      page.root!.shadowRoot!.querySelector('bpop-designio-dropdown')
    ).toBeTruthy();
  });

  it('should render BOCC correctly', async () => {
    const { page } = await createInstance(
      `<designio-dropdown type="bocc" options='[{"label":"A","value":"1"}]'></designio-dropdown>`
    );
    expect(page.root!.shadowRoot!.querySelector('bdo-dropdown')).toBeTruthy();
  });

  it('should render BAVV correctly', async () => {
    const { page } = await createInstance(
      `<designio-dropdown type="bavv" options='[{"label":"A","value":"1"}]'></designio-dropdown>`
    );
    expect(
      page.root!.shadowRoot!.querySelector('bavv-designio-dropdown')
    ).toBeTruthy();
  });

  it('should render BBOG correctly', async () => {
    const { page } = await createInstance(
      `<designio-dropdown type="bbog" options='[{"label":"A","value":"1"}]'></designio-dropdown>`
    );
    expect(page.root!.shadowRoot!.querySelector('sp-at-dropdown')).toBeTruthy();
  });

  it('should trigger applyBbogValue inside componentDidRender', async () => {
    const { instance } = await createInstance();
    const spy = jest.spyOn(instance as any, 'applyBbogValue');
    instance.componentDidRender();
    expect(spy).toHaveBeenCalled();
  });

  it('should generate tooltip attributes correctly in BBOG renderer', async () => {
    const { page } = await createInstance(`
      <designio-dropdown
        type="bbog"
        tooltip="true"
        tooltip-header="Header"
        tooltip-message="Message"
        options='[{ "label":"X","value":"1"}]'
      ></designio-dropdown>
    `);
    await page.waitForChanges();
    const el = page.root!.shadowRoot!.querySelector('sp-at-dropdown')!;
    expect(el.getAttribute('tooltip')).not.toBeNull();
    expect(el.getAttribute('tooltip-header')).toBe('Header');
    expect(el.getAttribute('tooltip-message')).toBe('Message');
  });

  it('should apply no-action attribute when BBOG is disabled', async () => {
    const { page } = await createInstance(`
      <designio-dropdown
        type="bbog"
        is-disabled="true"
        options='[{ "label":"X","value":"1"}]'
      ></designio-dropdown>
    `);
    await page.waitForChanges();
    const el = page.root!.shadowRoot!.querySelector('sp-at-dropdown')!;
    expect(el.getAttribute('no-action')).toBe('true');
  });

  it('should execute all dropdown renderers safely', async () => {
    const { page, instance } = await createInstance(
      `<designio-dropdown options='[{ "label":"A","value":"1"}]'></designio-dropdown>`
    );
    const types = ['bpop', 'bocc', 'bavv', 'bbog'];
    for (const t of types) {
      page.root!.setAttribute('type', t);
      await page.waitForChanges();
      const renderer = (instance as any).dropdownMap[t];
      expect(renderer()).toBeDefined();
    }
  });

  it('should return HELP in mapBbogStatus when state is warning', async () => {
    const { page } = await createInstance();
    page.root!.setAttribute('state', 'warning');
    await page.waitForChanges();
    expect(page.rootInstance['mapBbogStatus']()).toBe('HELP');
  });

  it('should return ENABLED when isHelp=false and isDisabled=false and state=selected', async () => {
    const { page } = await createInstance();
    page.root!.setAttribute('state', 'selected');
    page.root!.setAttribute('is-help', 'false');
    page.root!.setAttribute('is-disabled', 'false');
    await page.waitForChanges();
    expect(page.rootInstance['mapBbogStatus']()).toBe('ENABLED');
  });

  it('covers tooltip branch in dropdownMap.bbog', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown></designio-dropdown>`
    });

    const comp = page.rootInstance;

    comp.type = 'bbog';
    comp.tooltip = true;
    comp.label = 'Cuenta';
    comp.placeholder = 'Selecciona';

    await page.waitForChanges();

    const vdom = comp.render();

    const vnode = vdom.$children$[0];

    expect(vnode.$tag$).toBe('sp-at-dropdown');
    expect(vnode.$attrs$.tooltip).toBe(true);
  });

  it('covers non-tooltip branch in dropdownMap.bbog', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown></designio-dropdown>`
    });

    const comp = page.rootInstance;

    comp.type = 'bbog';
    comp.tooltip = false;

    await page.waitForChanges();

    const vdom = comp.render();
    const vnode = vdom.$children$[0];

    expect(vnode.$attrs$.tooltip).toBeUndefined();
  });

  it('covers normalizeOptions() catch block (invalid JSON)', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown></designio-dropdown>`
    });

    const comp = page.rootInstance;

    comp.options = '{ invalid json }';

    comp.type = 'bavv';
    await page.waitForChanges();

    const result = (comp as any).normalizeOptions();
    expect(result).toEqual([]);
  });

  it('componentDidLoad does not check when ShadowRoot is not defined', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown></designio-dropdown>`,
      supportsShadowDom: false
    });

    expect(() => page.rootInstance.componentDidLoad()).not.toThrow();
  });

  it('componentDidLoad calls querySelector when shadowRoot exists', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown></designio-dropdown>`
    });

    const shadow = page.root.shadowRoot;
    const spy = jest.spyOn(shadow, 'querySelector').mockReturnValue(null);

    page.rootInstance.componentDidLoad();

    expect(spy).toHaveBeenCalledWith('bpop-designio-dropdown');
    expect(spy).toHaveBeenCalledWith('bavv-designio-dropdown');
  });

  it('crea enriched label correctamente en handleBavvSelect', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bavv"></designio-dropdown>`
    });

    page.rootInstance.options = [{ value: 1, label: 'Uno' }];

    const emitSpy = jest.spyOn(page.rootInstance.selectionChange, 'emit');

    page.rootInstance['handleBavvSelect'](new CustomEvent('x', { detail: 1 }));

    expect(emitSpy).toHaveBeenCalledWith({ value: 1, label: 'Uno' });
  });

  it('mapBbogOptions correctly converts text/value', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown></designio-dropdown>`
    });

    const result = page.rootInstance['mapBbogOptions']([
      { label: 'A', value: 1 },
      { text: 'B', value: 2 }
    ]);

    expect(result).toEqual([
      { text: 'A', value: '1' },
      { text: 'B', value: '2' }
    ]);
  });

  it('mapBoccOptions converts options correctly', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown></designio-dropdown>`
    });

    page.rootInstance.options = [
      { value: 10, label: 'Diez' },
      { value: 20, text: 'Veinte' }
    ];

    const result = page.rootInstance['mapBoccOptions']();

    expect(result).toEqual([
      { id: '10', value: 'Diez' },
      { id: '20', value: 'Veinte' }
    ]);
  });

  it('applyBbogValue does NOT crash with _bbogRef null', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bbog"></designio-dropdown>`
    });

    page.rootInstance['_bbogRef'] = null as any;
    page.rootInstance.value = '123';

    expect(() => page.rootInstance['applyBbogValue']()).not.toThrow();
  });

  it('bocc renderer uses empty helperText in fieldStatus.message', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bocc"></designio-dropdown>`
    });

    page.rootInstance.helperText = undefined;
    await page.waitForChanges();

    const bdo = page.root.shadowRoot.querySelector('bdo-dropdown');

    const status = (bdo as any).fieldStatus;
    expect(status.message).toBe('');
  });

  it('bocc renderer uses an empty placeholder by default', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bocc"></designio-dropdown>`
    });

    const bdo = page.root.shadowRoot.querySelector('bdo-dropdown');

    const attrs = (bdo as any).attributesselect;
    expect(attrs.placeholder).toBe('');
  });

  it('bavv renderer converts value number to string', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bavv"></designio-dropdown>`
    });

    page.rootInstance.value = 33;
    await page.waitForChanges();

    const node = page.root.shadowRoot.querySelector('bavv-designio-dropdown');

    expect(node.getAttribute('value')).toBe('33');
  });

  it('bavv renderer uses empty errorMessage if helperText is undefined', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bavv"></designio-dropdown>`
    });

    page.rootInstance.helperText = undefined;
    await page.waitForChanges();

    const node = page.root.shadowRoot.querySelector('bavv-designio-dropdown');
    expect(node.getAttribute('errormessage')).toBe('');
  });

  it('normalizeOptions returns [] if options is invalid JSON', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown></designio-dropdown>`
    });

    page.rootInstance.options = '---xx---';

    const res = page.rootInstance['normalizeOptions']();
    expect(res).toEqual([]);
  });

  it('handleBavvSelect uses match.label when it exists', () => {
    const cmp = new DesignioDropdown();
    cmp.options = [{ value: 1, label: 'Hello' }];

    const emitSpy = jest.spyOn(cmp.selectionChange, 'emit');

    cmp['handleBavvSelect'](new CustomEvent('x', { detail: 1 }));

    expect(emitSpy).toHaveBeenCalledWith({ value: 1, label: 'Hello' });
  });

  it('handleBavvSelect uses empty label when match does not exist', () => {
    const cmp = new DesignioDropdown();
    cmp.options = [{ value: 2, label: 'Other' }];

    const emitSpy = jest.spyOn(cmp.selectionChange, 'emit');

    cmp['handleBavvSelect'](new CustomEvent('x', { detail: 1 }));

    expect(emitSpy).toHaveBeenCalledWith({ value: 1, label: '' });
  });

  it('mapBbogOptions maps valid options', () => {
    const cmp = new DesignioDropdown();
    const res = cmp['mapBbogOptions']([{ label: 'A', value: 1 }]);
    expect(res).toEqual([{ text: 'A', value: '1' }]);
  });

  it('mapBbogOptions returns empty array when opts is undefined', () => {
    const cmp = new DesignioDropdown();
    cmp.options = [];
    const res = cmp['mapBbogOptions'](undefined);
    expect(res).toEqual([]);
  });

  it('mapBoccOptions uses o.id when it exists', () => {
    const cmp = new DesignioDropdown();
    cmp.options = [{ id: 'xyz', value: 9 }];
    const res = cmp['mapBoccOptions']();
    expect(res[0].id).toBe('xyz');
  });

  it('mapBoccOptions uses String(o.value) when id does not exist', () => {
    const cmp = new DesignioDropdown();
    cmp.options = [{ value: 123 }];
    const res = cmp['mapBoccOptions']();
    expect(res[0].id).toBe('123');
  });

  it('mapBoccOptions uses label when present', () => {
    const cmp = new DesignioDropdown();
    cmp.options = [{ label: 'LBL', value: 5 }];
    const res = cmp['mapBoccOptions']();
    expect(res[0].value).toBe('LBL');
  });

  it('mapBoccOptions uses text when label is missing', () => {
    const cmp = new DesignioDropdown();
    cmp.options = [{ text: 'TXT', value: 5 }];
    const res = cmp['mapBoccOptions']();
    expect(res[0].value).toBe('TXT');
  });

  it('mapBoccOptions uses String(value) when label and text are missing', () => {
    const cmp = new DesignioDropdown();
    cmp.options = [{ value: 5 }];
    const res = cmp['mapBoccOptions']();
    expect(res[0].value).toBe('5');
  });

  it('getBoccSelectedOption returns matched option', () => {
    const cmp = new DesignioDropdown();
    cmp.value = '10';
    const res = cmp['getBoccSelectedOption']([{ id: '10', value: 'x' }]);
    expect(res).toEqual({ id: '10', value: 'x' });
  });

  it('getBoccSelectedOption returns null when not matched', () => {
    const cmp = new DesignioDropdown();
    cmp.value = '20';
    const res = cmp['getBoccSelectedOption']([{ id: '10', value: 'x' }]);
    expect(res).toBeNull();
  });

  it('bpop renderer does not set is-disabled when isDisabled is false', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bpop"></designio-dropdown>`
    });

    page.rootInstance.isDisabled = false;
    await page.waitForChanges();

    const node = page.root.shadowRoot.querySelector('bpop-designio-dropdown');
    expect(node.getAttribute('is-disabled')).toBeNull();
  });

  it('bpop renderer sets is-disabled boolean attribute when isDisabled is true', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bpop" is-disabled="true"></designio-dropdown>`
    });

    page.rootInstance.isDisabled = true;
    await page.waitForChanges();

    const node = page.root.shadowRoot.querySelector('bpop-designio-dropdown');

    expect(node.hasAttribute('is-disabled')).toBe(true);
  });

  it('bpop renderer does not include is-disabled when isDisabled is false', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bpop"></designio-dropdown>`
    });

    page.rootInstance.isDisabled = false;
    await page.waitForChanges();

    const node = page.root.shadowRoot.querySelector('bpop-designio-dropdown');

    expect(node.hasAttribute('is-disabled')).toBe(false);
  });

  it('bocc renderer uses helperText when provided', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bocc" helper-text="HELP"></designio-dropdown>`
    });

    const bdo: any = page.root.shadowRoot.querySelector('bdo-dropdown');

    expect(bdo.fieldStatus.message).toBe('HELP');
  });

  it('bocc renderer uses empty message when helperText is missing', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bocc"></designio-dropdown>`
    });

    const bdo: any = page.root.shadowRoot.querySelector('bdo-dropdown');

    expect(bdo.fieldStatus.message).toBe('');
  });

  it('bocc renderer uses empty placeholder when missing', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bocc"></designio-dropdown>`
    });

    const bdo: any = page.root.shadowRoot.querySelector('bdo-dropdown');

    expect(bdo.attributesselect.placeholder).toBe('');
  });

  it('bavv renderer uses helperText in errorMessage', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bavv" helper-text="ERR" state="error"></designio-dropdown>`
    });

    const node = page.root.shadowRoot.querySelector('bavv-designio-dropdown');
    expect(node.getAttribute('errormessage')).toBe('ERR');
  });

  it('bavv renderer uses empty errorMessage when helperText is missing', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bavv"></designio-dropdown>`
    });

    const node = page.root.shadowRoot.querySelector('bavv-designio-dropdown');
    expect(node.getAttribute('errormessage')).toBe('');
  });

  it('mapBbogOptions returns empty array when rawOptions is undefined', () => {
    const dropdown = new DesignioDropdown();
    dropdown.options = undefined as any;

    const result = dropdown['mapBbogOptions'](undefined);
    expect(result).toEqual([]);
  });

  it('mapBbogOptions maps options when rawOptions is provided', () => {
    const dropdown = new DesignioDropdown();

    const input = [
      { label: 'A', value: 1 },
      { text: 'B', value: 2 }
    ];

    const result = dropdown['mapBbogOptions'](input);

    expect(result).toEqual([
      { text: 'A', value: '1' },
      { text: 'B', value: '2' }
    ]);
  });
  it('bocc renderer uses the provided placeholder when present (covers ?? branch)', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bocc" placeholder="CHOSEN"></designio-dropdown>`
    });

    const bdo: any = page.root.shadowRoot.querySelector('bdo-dropdown');

    expect(bdo.attributesselect.placeholder).toBe('CHOSEN');
  });

  it('bocc renderer uses empty placeholder when none is provided (covers empty branch)', async () => {
    const page = await newSpecPage({
      components: [DesignioDropdown],
      html: `<designio-dropdown type="bocc"></designio-dropdown>`
    });

    const bdo: any = page.root.shadowRoot.querySelector('bdo-dropdown');

    expect(bdo.attributesselect.placeholder).toBe('');
  });
});
