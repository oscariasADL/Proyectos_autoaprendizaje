import { newSpecPage } from '@stencil/core/testing';
import { DesignioInput } from '../designio-input';

describe('designio-input', () => {
  it('correctly renders the bavv component', async () => {
    const page = await newSpecPage({
      components: [DesignioInput],
      html: `<designio-input entity="bavv" label="Nombre" value="Juan" bavvButtonText="Click me"></designio-input>`
    });

    expect(page.root).toMatchSnapshot();
  });

  it('emits the bavvButtonClick event when the button is clicked', async () => {
    const page = await newSpecPage({
      components: [DesignioInput],
      html: `<designio-input entity="bavv" bavvButtonText="Click me"></designio-input>`
    });

    const component = page.rootInstance;
    const spy = jest.fn();
    component.bavvButtonClick = { emit: spy } as any;

    component.handleBavvButtonClick();
    expect(spy).toHaveBeenCalled();
  });

  it('correctly renders the bocc component', async () => {
    const page = await newSpecPage({
      components: [DesignioInput],
      html: `<designio-input entity="bocc" label="Correo" value="test@example.com"></designio-input>`
    });

    expect(page.root).toMatchSnapshot();
  });

  it('correctly renders the bocc component with boccAttributes attribute', async () => {
    const page = await newSpecPage({
      components: [DesignioInput],
      html: `<designio-input entity="bocc" bocc-attributes="{ "onlyletters": true }"></designio-input>`
    });

    const component = page.rootInstance;
    expect(typeof component.boccAttributes).toBe('string');
  });

  it('correctly transforms the boccAttributes attribute for bocc', async () => {
    const page = await newSpecPage({
      components: [DesignioInput],
      html: `<designio-input entity="bocc" bocc-attributes='{"onlyletters": true}'></designio-input>`
    });

    const component = page.rootInstance;
    const parsedAttributes = component['getParsedBoccAttributes']();
    console.log('parsedAttributes: ', parsedAttributes);

    expect(parsedAttributes).toEqual({ onlyletters: true });
  });

  it('correctly renders the bocc component with min and max as strings', async () => {
    const page = await newSpecPage({
      components: [DesignioInput],
      html: `<designio-input entity="bocc" min="8" max="12"></designio-input>`
    });

    const component = page.rootInstance;
    expect(typeof component.min).toBe('string');
    expect(typeof component.max).toBe('string');
    expect(page.root).toMatchSnapshot();
  });

  it('correctly renders the bpop component', async () => {
    const page = await newSpecPage({
      components: [DesignioInput],
      html: `<designio-input entity="bpop" label="Edad" value="30"></designio-input>`
    });

    expect(page.root).toMatchSnapshot();
  });

  it('correctly renders the bbog component', async () => {
    const page = await newSpecPage({
      components: [DesignioInput],
      html: `<designio-input entity="bbog" label="Contraseña" value="1234"></designio-input>`
    });

    expect(page.root).toMatchSnapshot();
  });

  it('correctly emits bbog events', async () => {
    const page = await newSpecPage({
      components: [DesignioInput],
      html: `<designio-input entity="bbog"></designio-input>`
    });

    const component = page.rootInstance;

    const events = [
      'bbogAtInputChanged',
      'bbogAtInputEnterKey',
      'bbogAtInputOnBlur',
      'bbogAtInputOnFocus',
      'bbogAtInputOnKeyDown',
      'bbogAtInputUpdated',
      'bbogOnInputIconClick'
    ];

    for (const eventName of events) {
      const spy = jest.fn();
      component[eventName] = { emit: spy } as any;
      component[
        `handle${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`
      ]();
      expect(spy).toHaveBeenCalled();
    }
  });
});
