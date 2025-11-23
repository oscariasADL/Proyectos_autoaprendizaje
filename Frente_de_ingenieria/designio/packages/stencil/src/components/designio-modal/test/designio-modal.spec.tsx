import { newSpecPage } from '@stencil/core/testing';
import { DesignioModal } from '../designio-modal';

// Mock para IDs estables en snapshots
beforeAll(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
});

describe('designio-modal', () => {
  it('renders BOCC modal', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bocc" modal-title="Test" subtitle="Sub" show-close="true"></designio-modal>`
    });
    expect(page.root).toMatchSnapshot();
  });

  it('renders BAVV modal', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bavv" modal-title="Test" subtitle="Sub" show-close="true"></designio-modal>`
    });
    expect(page.root).toMatchSnapshot();
  });

  it('renders BPOP modal', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bpop" modal-title="Test" subtitle="Sub" show-close="true"></designio-modal>`
    });
    expect(page.root).toMatchSnapshot();
  });

  // Test actualizado para reflejar la nueva estructura del modal BBOG
  it('renders BBOG modal', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bbog" modal-title="Test" subtitle="Sub" show-close="true"></designio-modal>`
    });

    // Verificar que el modal BBOG se renderiza con la estructura correcta
    const spModalNormal =
      page.root.shadowRoot.querySelector('sp-ml-modal-normal');
    expect(spModalNormal).toBeTruthy();
    expect(spModalNormal.getAttribute('titlemodal')).toBe('Test');
    expect(spModalNormal.getAttribute('back-drop-close')).toBe('');
    expect(spModalNormal.getAttribute('size-modal')).toBe('md');

    // Verificar que el contenido está en el slot body-modal
    const bodyModalSlot = spModalNormal.querySelector('[slot="body-modal"]');
    expect(bodyModalSlot).toBeTruthy();
    expect(bodyModalSlot.querySelector('p')).toBeTruthy();
    expect(bodyModalSlot.querySelector('p').textContent.trim()).toBe('Sub');
    expect(bodyModalSlot.querySelector('slot[name="content"]')).toBeTruthy();
  });

  it('renders BBOG modal with custom properties', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bbog" modal-title="Custom Test" size="lg" hide-close="true" modal-id="custom-modal-id"></designio-modal>`
    });

    const spModalNormal =
      page.root.shadowRoot.querySelector('sp-ml-modal-normal');
    expect(spModalNormal).toBeTruthy();
    expect(spModalNormal.getAttribute('size-modal')).toBe('lg');
    // Corregir la verificación del atributo hideClose - puede ser "" en lugar de "true"
    expect(spModalNormal.hasAttribute('hideclose')).toBe(true);
    expect(spModalNormal.getAttribute('idmodal')).toBe('custom-modal-id');
  });

  it('does not render any modal if type is invalid', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="invalido"></designio-modal>`
    });
    expect(page.root).toMatchSnapshot();
  });

  it('handlePrimaryAction closes the modal', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bocc"></designio-modal>`
    });
    const instance = page.rootInstance;
    const closeSpy = jest.spyOn(instance, 'closeModal');
    instance.handlePrimaryAction();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('handleSecondaryAction closes the modal', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bpop"></designio-modal>`
    });
    const instance = page.rootInstance;
    const closeSpy = jest.spyOn(instance, 'closeModal');
    instance.handleSecondaryAction();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('openModal works for bocc', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bocc" show-primary-button="true" show-secondary-button="true"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = { isopen: false };
    const emitSpy = jest.spyOn(instance.opened, 'emit');
    await instance.openModal();
    expect(instance.modalRef.isopen).toBe(true);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('openModal works for bavv', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bavv"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = { open: jest.fn() };
    const emitSpy = jest.spyOn(instance.opened, 'emit');
    await instance.openModal();
    expect(instance.modalRef.open).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('openModal works for bpop', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bpop"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = { open: jest.fn() };
    const emitSpy = jest.spyOn(instance.opened, 'emit');
    await instance.openModal();
    expect(instance.modalRef.open).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  // Test actualizado para BBOG con las nuevas propiedades
  it('openModal works for bbog', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bbog" modal-id="custom-id" size="lg" hide-close="true"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = {
      openModal: jest.fn(),
      sizeModal: '',
      hideClose: false,
      idModal: ''
    };
    const emitSpy = jest.spyOn(instance.opened, 'emit');
    await instance.openModal();

    expect(instance.modalRef.openModal).toHaveBeenCalled();
    expect(instance.modalRef.sizeModal).toBe('lg');
    expect(instance.modalRef.hideClose).toBe(true);
    expect(instance.modalRef.idModal).toBe('custom-id');
    expect(emitSpy).toHaveBeenCalled();
  });

  it('closeModal works for bocc', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bocc"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = { isopen: true };
    const emitSpy = jest.spyOn(instance.closed, 'emit');
    await instance.closeModal();
    expect(instance.modalRef.isopen).toBe(false);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('closeModal works for bavv', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bavv"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = { isOpen: true };
    const emitSpy = jest.spyOn(instance.closed, 'emit');
    await instance.closeModal();
    expect(instance.modalRef.isOpen).toBe(false);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('closeModal works for bpop', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bpop"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = { close: jest.fn() };
    const emitSpy = jest.spyOn(instance.closed, 'emit');
    await instance.closeModal();
    expect(instance.modalRef.close).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('closeModal works for bbog', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bbog"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = { closeModal: jest.fn() };
    const emitSpy = jest.spyOn(instance.closed, 'emit');
    await instance.closeModal();
    expect(instance.modalRef.closeModal).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('openModal/closeModal handle null modalRef', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bocc"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = null;
    await expect(instance.openModal()).resolves.toBeUndefined();
    await expect(instance.closeModal()).resolves.toBeUndefined();
  });

  it('componentDidLoad/disconnectedCallback handle null modalRef', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bpop"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = null;
    expect(() => instance.componentDidLoad()).not.toThrow();
    expect(() => instance.disconnectedCallback()).not.toThrow();
  });

  it('componentDidLoad/disconnectedCallback call event listeners', async () => {
    const page = await newSpecPage({
      components: [DesignioModal],
      html: `<designio-modal type="bpop"></designio-modal>`
    });
    const instance = page.rootInstance;
    instance.modalRef = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };
    instance.componentDidLoad();
    instance.disconnectedCallback();
    expect(instance.modalRef.addEventListener).toHaveBeenCalled();
    expect(instance.modalRef.removeEventListener).toHaveBeenCalled();
  });
});
