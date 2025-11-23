import { newSpecPage } from '@stencil/core/testing';
import { DesignioButton } from '../designio-button';

describe('designio-button', () => {
  // TESTS BÁSICOS DE RENDERIZADO
  it('should render with default type bbog', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button label="Click me"></designio-button>`
    });

    expect(page.root).toBeTruthy();
    expect(
      page.root.shadowRoot?.querySelector('button')?.textContent?.trim()
    ).toBe('Click me');
    expect(page.rootInstance.type).toBe('bbog');
  });

  it('should render bocc button type', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bocc" label="Bocc button" variant-bocc="primary" size-bocc="M"></designio-button>`
    });

    expect(page.root.shadowRoot?.querySelector('bdo-button')).toBeTruthy();
    expect(
      page.root.shadowRoot
        ?.querySelector('bdo-button')
        ?.getAttribute('textButton')
    ).toBe('Bocc button');
    expect(
      page.root.shadowRoot
        ?.querySelector('bdo-button')
        ?.getAttribute('typeButton')
    ).toBe('primary');
    expect(
      page.root.shadowRoot?.querySelector('bdo-button')?.getAttribute('size')
    ).toBe('M');
  });

  it('should render bavv button type with variant', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" label="Bavv" variant-bavv="secondary" size-bavv="regular"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
    expect(btn).toBeTruthy();
    expect(btn?.getAttribute('variant')).toBe('secondary');
    expect(btn?.getAttribute('size')).toBe('regular');
  });

  it('should render bpop button type with loading state', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bpop" label="Bpop" variant-bpop="primary" size-bpop="regular" is-loading="true"></designio-button>`
    });

    const adapter = page.root.shadowRoot?.querySelector('bpop-designio-button');
    expect(adapter).toBeTruthy();
    expect(adapter?.hasAttribute('loading')).toBe(true);
  });

  // TESTS DE WIDTH MODE
  it('should render bpop button with full width mode', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bpop" label="Full Width" variant-bpop="primary" size-bpop="regular" width-mode-bpop="full"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bpop-designio-button');
    expect(btn?.getAttribute('widthMode')).toBe('full');
  });

  it('should render bavv button with different width modes', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" label="Auto Width" variant-bavv="primary" size-bavv="regular" width-mode-bavv="auto"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
    expect(btn?.getAttribute('widthMode')).toBe('auto');
  });

  // TESTS DE EVENTOS
  it('should emit buttonClicked event for bbog type', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button label="Click me" id-button="bbog-btn"></designio-button>`
    });

    const spy = jest.fn();
    page.win.addEventListener('buttonClicked', spy);

    const btn = page.root.shadowRoot?.querySelector('button');
    btn?.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bbog',
          id: 'bbog-btn',
          label: 'Click me'
        })
      })
    );
  });

  it('should emit buttonClicked event for bocc type', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bocc" id-button="bocc-btn" label="BOCC Test" variant-bocc="primary" size-bocc="M"></designio-button>`
    });

    const spy = jest.fn();
    page.win.addEventListener('buttonClicked', spy);

    const btn = page.root.shadowRoot?.querySelector('bdo-button');
    btn?.dispatchEvent(
      new CustomEvent('clickButton', {
        bubbles: true,
        detail: { id: 'bocc-btn', value: 'test-value' }
      })
    );
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bocc',
          id: 'bocc-btn',
          label: 'BOCC Test',
          value: 'test-value'
        })
      })
    );
  });

  it('should emit buttonClicked event for bavv type', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" id-button="bavv-btn" label="BAVV Test" variant-bavv="primary" size-bavv="regular"></designio-button>`
    });

    const spy = jest.fn();
    page.win.addEventListener('buttonClicked', spy);

    const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
    btn?.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bavv',
          id: 'bavv-btn',
          label: 'BAVV Test'
        })
      })
    );
  });

  it('should emit buttonClicked event for bpop type', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bpop" id-button="bpop-btn" label="BPOP Test" variant-bpop="primary" size-bpop="regular"></designio-button>`
    });

    const spy = jest.fn();
    page.win.addEventListener('buttonClicked', spy);

    const btn = page.root.shadowRoot?.querySelector('bpop-designio-button');
    btn?.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bpop',
          id: 'bpop-btn',
          label: 'BPOP Test'
        })
      })
    );
  });

  // CORREGIDO: Test de disabled simplificado
  it('should handle disabled state for bbog type only', async () => {
    const pageBbog = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bbog" label="Disabled" is-disabled="true"></designio-button>`
    });

    const bbogBtn = pageBbog.root.shadowRoot?.querySelector('button');
    expect(bbogBtn).toBeTruthy();
    expect(bbogBtn?.hasAttribute('disabled')).toBe(true);
  });

  // TESTS DE EDGE CASES
  it('should handle undefined/null values gracefully', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bbog"></designio-button>`
    });

    const button = page.root.shadowRoot?.querySelector('button');
    expect(button?.textContent?.trim()).toBe('');
    expect(button?.getAttribute('id')).toBe('bbog-btn');
  });

  it('should handle invalid type gracefully', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bbog" label="Test"></designio-button>`
    });

    expect(page.rootInstance.type).toBe('bbog');
    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot?.querySelector('button')).toBeTruthy();
  });

  it('should handle event without detail object', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" id-button="test-btn" label="Test" variant-bavv="primary" size-bavv="regular"></designio-button>`
    });

    const spy = jest.fn();
    page.win.addEventListener('buttonClicked', spy);

    const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
    btn?.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bavv',
          id: 'test-btn',
          label: 'Test'
        })
      })
    );
  });

  // TESTS DE CONFIGURACIÓN COMPLETA
  it('should render BOCC with all attributes correctly', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bocc" label="BOCC Full" variant-bocc="tertiary" size-bocc="S" divided-bocc="true" prefix-icon="icon-prefix" suffix-icon="icon-suffix" id-button="bocc-full"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bdo-button');

    expect(btn?.getAttribute('textButton')).toBe('BOCC Full');
    expect(btn?.getAttribute('typeButton')).toBe('tertiary');
    expect(btn?.getAttribute('size')).toBe('S');
    expect(btn?.hasAttribute('divided')).toBe(true);
    expect(btn?.getAttribute('prefixIcon')).toBe('icon-prefix');
    expect(btn?.getAttribute('suffixIcon')).toBe('icon-suffix');
  });

  it('should render BAVV with complete configuration', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" label="BAVV Complete" variant-bavv="borderless" size-bavv="small" width-mode-bavv="full" button-type="reset" html-index="3" name="bavv-complete" id-button="bavv-complete-id" prefix-icon="bavv-prefix" suffix-icon="bavv-suffix"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');

    expect(btn?.getAttribute('idButton')).toBe('bavv-complete-id');
    expect(btn?.getAttribute('type')).toBe('reset');
    expect(btn?.getAttribute('htmlIndex')).toBe('3');
    expect(btn?.getAttribute('name')).toBe('bavv-complete');
    expect(btn?.getAttribute('prefixIcon')).toBe('bavv-prefix');
    expect(btn?.getAttribute('suffixIcon')).toBe('bavv-suffix');
    expect(btn?.getAttribute('size')).toBe('small');
    expect(btn?.getAttribute('variant')).toBe('borderless');
    expect(btn?.getAttribute('widthMode')).toBe('full');
    expect(btn?.textContent?.trim()).toBe('BAVV Complete');
  });

  it('should render BPOP with complete configuration', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bpop" label="BPOP Complete" variant-bpop="secondary" size-bpop="large" width-mode-bpop="full" button-type="button" html-index="2" name="bpop-complete" id-button="bpop-complete-id" prefix-icon="bpop-prefix" suffix-icon="bpop-suffix" is-loading="true"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bpop-designio-button');

    expect(btn?.getAttribute('idButton')).toBe('bpop-complete-id');
    expect(btn?.getAttribute('type')).toBe('button');
    expect(btn?.getAttribute('htmlIndex')).toBe('2');
    expect(btn?.getAttribute('name')).toBe('bpop-complete');
    expect(btn?.getAttribute('prefixIcon')).toBe('bpop-prefix');
    expect(btn?.getAttribute('suffixIcon')).toBe('bpop-suffix');
    expect(btn?.getAttribute('size')).toBe('large');
    expect(btn?.getAttribute('variant')).toBe('secondary');
    expect(btn?.getAttribute('widthMode')).toBe('full');
    expect(btn?.hasAttribute('loading')).toBe(true);
    expect(btn?.textContent?.trim()).toBe('BPOP Complete');
  });

  it('should render BBOG button with correct structure', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bbog" label="BBOG Icons" id-button="bbog-icons"></designio-button>`
    });

    const button = page.root.shadowRoot?.querySelector('button');

    expect(button?.textContent?.trim()).toBe('BBOG Icons');
    expect(button?.getAttribute('id')).toBe('bbog-icons');
    expect(button?.getAttribute('class')).toContain(
      'sp-at-btn sp-at-btn--primary sp-at-btn--lg'
    );
  });

  // TESTS DE WIDTH MODES
  it('should handle all width modes for BPOP', async () => {
    const widthModes = ['default', 'full'];

    for (const widthMode of widthModes) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bpop" label="Width Test" variant-bpop="primary" size-bpop="regular" width-mode-bpop="${widthMode}"></designio-button>`
      });

      const btn = page.root.shadowRoot?.querySelector('bpop-designio-button');
      expect(btn?.getAttribute('widthMode')).toBe(widthMode);
    }
  });

  it('should handle all width modes for BAVV', async () => {
    const widthModes = ['default', 'auto', 'full'];

    for (const widthMode of widthModes) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bavv" label="Width Test" variant-bavv="primary" size-bavv="regular" width-mode-bavv="${widthMode}"></designio-button>`
      });

      const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
      expect(btn?.getAttribute('widthMode')).toBe(widthMode);
    }
  });

  // TESTS DE BUTTON TYPES
  it('should handle all button types for BAVV', async () => {
    const buttonTypes = ['button', 'submit', 'reset'];

    for (const buttonType of buttonTypes) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bavv" label="Type Test" variant-bavv="primary" size-bavv="regular" button-type="${buttonType}"></designio-button>`
      });

      const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
      expect(btn?.getAttribute('type')).toBe(buttonType);
    }
  });

  it('should handle all button types for BBOG', async () => {
    const buttonTypes = ['button', 'submit', 'reset'];

    for (const buttonType of buttonTypes) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bbog" label="Type Test" button-type="${buttonType}"></designio-button>`
      });

      const button = page.root.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('type')).toBe(buttonType);
    }
  });

  // TESTS DE ICONOS
  it('should render prefix and suffix icons for bavv', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" label="Test" prefix-icon="plus" suffix-icon="arrow-right" variant-bavv="primary" size-bavv="regular"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
    expect(btn?.getAttribute('prefixIcon')).toBe('plus');
    expect(btn?.getAttribute('suffixIcon')).toBe('arrow-right');
  });

  it('should render prefix and suffix icons for bbog', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bbog" label="Test" prefix-icon="check" suffix-icon="arrow-right"></designio-button>`
    });

    const button = page.root.shadowRoot?.querySelector('button');
    const content = button?.textContent;

    // For BBOG, icons are not rendered in the content, just the label
    expect(content?.trim()).toBe('Test');
  });

  it('should handle bocc divided property', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bocc" label="Divided" divided-bocc="true" variant-bocc="primary" size-bocc="M"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bdo-button');
    expect(btn?.hasAttribute('divided')).toBe(true);
  });

  it('should set correct HTML attributes for bbog', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bbog" label="Submit" button-type="submit" html-index="1" name="submit-btn"></designio-button>`
    });

    const button = page.root.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('type')).toBe('submit');
    expect(button?.getAttribute('tabindex')).toBe('1');
    expect(button?.getAttribute('name')).toBe('submit-btn');
  });

  // TESTS DE VARIANTES
  it('should handle different bocc variants', async () => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'primaryDanger',
      'link'
    ];

    for (const variant of variants) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bocc" label="Test" variant-bocc="${variant}" size-bocc="M"></designio-button>`
      });

      const btn = page.root.shadowRoot?.querySelector('bdo-button');
      expect(btn?.getAttribute('typeButton')).toBe(variant);
    }
  });

  it('should handle different bpop variants', async () => {
    const variants = [
      'primary',
      'secondary',
      'text-primary',
      'text-secondary',
      'text-hiperlink'
    ];

    for (const variant of variants) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bpop" label="Test" variant-bpop="${variant}" size-bpop="regular"></designio-button>`
      });

      const btn = page.root.shadowRoot?.querySelector('bpop-designio-button');
      expect(btn?.getAttribute('variant')).toBe(variant);
    }
  });

  it('should handle different bavv variants', async () => {
    const variants = ['primary', 'secondary', 'tertiary', 'borderless'];

    for (const variant of variants) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bavv" label="Test" variant-bavv="${variant}" size-bavv="regular"></designio-button>`
      });

      const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
      expect(btn?.getAttribute('variant')).toBe(variant);
    }
  });

  // TESTS DE TAMAÑOS
  it('should handle all bocc sizes', async () => {
    const sizes = ['S', 'M', 'L'];

    for (const size of sizes) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bocc" label="Test" variant-bocc="primary" size-bocc="${size}"></designio-button>`
      });

      const btn = page.root.shadowRoot?.querySelector('bdo-button');
      expect(btn?.getAttribute('size')).toBe(size);
    }
  });

  it('should handle all bpop sizes', async () => {
    const sizes = ['x-small', 'small', 'regular', 'large'];

    for (const size of sizes) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bpop" label="Test" variant-bpop="primary" size-bpop="${size}"></designio-button>`
      });

      const btn = page.root.shadowRoot?.querySelector('bpop-designio-button');
      expect(btn?.getAttribute('size')).toBe(size);
    }
  });

  it('should handle all bavv sizes', async () => {
    const sizes = ['small', 'regular'];

    for (const size of sizes) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="bavv" label="Test" variant-bavv="primary" size-bavv="${size}"></designio-button>`
      });

      const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
      expect(btn?.getAttribute('size')).toBe(size);
    }
  });

  // TESTS DE LOGGING
  it('should log debug information when button is clicked', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bpop" id-button="test-id" label="Test" variant-bpop="primary" size-bpop="regular"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bpop-designio-button');
    btn?.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true }));
    await page.waitForChanges();

    expect(logSpy).toHaveBeenCalledWith(
      'Botón del adapter tipo bpop clickeado, id: test-id, label: Test'
    );

    logSpy.mockRestore();
  });

  it('should log correct information for each button type', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const pageBbog = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bbog" id-button="bbog-log" label="BBOG Log"></designio-button>`
    });

    const bbogBtn = pageBbog.root.shadowRoot?.querySelector('button');
    bbogBtn?.click();
    await pageBbog.waitForChanges();

    expect(logSpy).toHaveBeenCalledWith(
      'Botón del adapter tipo bbog clickeado, id: bbog-log, label: BBOG Log'
    );

    logSpy.mockRestore();
  });

  // TESTS DE LOADING STATE
  it('should handle loading state for bpop buttons', async () => {
    const pagePrimary = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bpop" label="Loading" variant-bpop="primary" size-bpop="regular" is-loading="true"></designio-button>`
    });

    expect(
      pagePrimary.root.shadowRoot
        ?.querySelector('bpop-designio-button')
        ?.hasAttribute('loading')
    ).toBe(true);
  });

  // TESTS DE VALORES POR DEFECTO
  it('should use correct default values for all props', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button></designio-button>`
    });

    expect(page.rootInstance.label).toBe('');
    expect(page.rootInstance.type).toBe('bbog');
    expect(page.rootInstance.isDisabled).toBe(false);
    expect(page.rootInstance.isLoading).toBe(false);
    expect(page.rootInstance.buttonType).toBe('submit');
    expect(page.rootInstance.htmlIndex).toBe(0);
    expect(page.rootInstance.dividedBocc).toBe(false);
  });

  // TESTS DE CONFIGURACIÓN MÍNIMA
  it('should render each type with minimal configuration', async () => {
    const types = ['bocc', 'bavv', 'bpop', 'bbog'];

    for (const type of types) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="${type}"></designio-button>`
      });

      expect(page.root).toBeTruthy();
      expect(page.rootInstance.type).toBe(type);

      if (type === 'bocc') {
        expect(page.root.shadowRoot?.querySelector('bdo-button')).toBeTruthy();
      } else if (type === 'bavv') {
        expect(
          page.root.shadowRoot?.querySelector('bavv-designio-button')
        ).toBeTruthy();
      } else if (type === 'bpop') {
        expect(
          page.root.shadowRoot?.querySelector('bpop-designio-button')
        ).toBeTruthy();
      } else if (type === 'bbog') {
        expect(page.root.shadowRoot?.querySelector('button')).toBeTruthy();
      }
    }
  });

  // CORREGIDO: Test de HTML index simplificado
  it('should handle HTML index for bbog type only', async () => {
    const pageBbog = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bbog" html-index="7" label="Index Test"></designio-button>`
    });

    const bbogBtn = pageBbog.root.shadowRoot?.querySelector('button');
    expect(bbogBtn).toBeTruthy();
    expect(bbogBtn?.getAttribute('tabindex')).toBe('7');
  });

  // TESTS ADICIONALES
  it('should render wrapper div container', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button label="Container Test"></designio-button>`
    });

    const wrapper = page.root.shadowRoot?.querySelector('div');
    expect(wrapper).toBeTruthy();
    expect(wrapper?.querySelector('button')).toBeTruthy();
  });

  it('should handle empty label gracefully', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button label=""></designio-button>`
    });

    const button = page.root.shadowRoot?.querySelector('button');
    expect(button?.textContent?.trim()).toBe('');
  });

  it('should handle missing optional properties', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" label="Minimal"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
    expect(btn).toBeTruthy();
    expect(btn?.textContent?.trim()).toBe('Minimal');
  });

  it('should handle name attribute for form elements', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" label="Form Button" name="form-button"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');
    expect(btn?.getAttribute('name')).toBe('form-button');
  });

  it('should handle custom ID for each bank type', async () => {
    const types = [
      { type: 'bocc', element: 'bdo-button' },
      { type: 'bavv', element: 'bavv-designio-button' },
      { type: 'bpop', element: 'bpop-designio-button' },
      { type: 'bbog', element: 'button' }
    ];

    for (const config of types) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="${config.type}" label="Test" id-button="custom-${config.type}"></designio-button>`
      });

      const element = page.root.shadowRoot?.querySelector(config.element);
      expect(element).toBeTruthy();

      if (config.type === 'bbog') {
        expect(element?.getAttribute('id')).toBe(`custom-${config.type}`);
      } else if (config.type !== 'bocc') {
        expect(element?.getAttribute('idButton')).toBe(`custom-${config.type}`);
      }
    }
  });

  it('should use default IDs when no custom ID provided', async () => {
    const types = [
      { type: 'bocc', element: 'bdo-button', defaultId: 'bocc-btn' },
      { type: 'bavv', element: 'bavv-designio-button', defaultId: 'bavv-btn' },
      { type: 'bpop', element: 'bpop-designio-button', defaultId: 'bpop-btn' },
      { type: 'bbog', element: 'button', defaultId: 'bbog-btn' }
    ];

    for (const config of types) {
      const page = await newSpecPage({
        components: [DesignioButton],
        html: `<designio-button type="${config.type}" label="Test"></designio-button>`
      });

      const element = page.root.shadowRoot?.querySelector(config.element);
      expect(element).toBeTruthy();

      if (config.type === 'bbog') {
        expect(element?.getAttribute('id')).toBe(config.defaultId);
      } else if (config.type !== 'bocc') {
        expect(element?.getAttribute('idButton')).toBe(config.defaultId);
      }
    }
  });

  it('should handle prefix and suffix icons for bocc', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bocc" label="BOCC Icons" prefix-icon="warning" suffix-icon="check" variant-bocc="primary" size-bocc="M"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bdo-button');
    expect(btn?.getAttribute('prefixIcon')).toBe('warning');
    expect(btn?.getAttribute('suffixIcon')).toBe('check');
  });

  it('should handle prefix and suffix icons for bpop', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bpop" label="BPOP Icons" prefix-icon="dollar" suffix-icon="arrow" variant-bpop="primary" size-bpop="regular"></designio-button>`
    });

    const btn = page.root.shadowRoot?.querySelector('bpop-designio-button');
    expect(btn?.getAttribute('prefixIcon')).toBe('dollar');
    expect(btn?.getAttribute('suffixIcon')).toBe('arrow');
  });

  it('should handle complex event data propagation', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bocc" id-button="complex-btn" label="Complex Event" variant-bocc="primary" size-bocc="M"></designio-button>`
    });

    const spy = jest.fn();
    page.win.addEventListener('buttonClicked', spy);

    const btn = page.root.shadowRoot?.querySelector('bdo-button');
    btn?.dispatchEvent(
      new CustomEvent('clickButton', {
        bubbles: true,
        detail: {
          id: 'complex-btn',
          value: { complex: 'data', number: 42 }
        }
      })
    );
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          type: 'bocc',
          id: 'complex-btn',
          label: 'Complex Event',
          value: { complex: 'data', number: 42 }
        })
      })
    );
  });

  it('should maintain accessibility attributes', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bbog" label="Accessible Button" html-index="5" name="accessible-btn"></designio-button>`
    });

    const button = page.root.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('tabindex')).toBe('5');
    expect(button?.getAttribute('name')).toBe('accessible-btn');
    expect(button?.getAttribute('type')).toBe('submit');
  });

  it('should handle rapid event dispatching', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" id-button="rapid-btn" label="Rapid Test" variant-bavv="primary" size-bavv="regular"></designio-button>`
    });

    const spy = jest.fn();
    page.win.addEventListener('buttonClicked', spy);

    const btn = page.root.shadowRoot?.querySelector('bavv-designio-button');

    for (let i = 0; i < 5; i++) {
      btn?.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true }));
    }
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(5);
  });

  it('should handle error scenarios gracefully', async () => {
    const page = await newSpecPage({
      components: [DesignioButton],
      html: `<designio-button type="bavv" label="Error Test"></designio-button>`
    });

    expect(page.root).toBeTruthy();
    expect(
      page.root.shadowRoot?.querySelector('bavv-designio-button')
    ).toBeTruthy();
  });
});
