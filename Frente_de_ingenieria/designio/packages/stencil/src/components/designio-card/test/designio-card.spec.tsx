import { newSpecPage } from '@stencil/core/testing';
import { DesignioCard } from '../designio-card';

describe('designio-card', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card></designio-card>`
    });

    expect(page.root).toBeTruthy();
    expect(page.rootInstance.type).toBe('bocc');
    expect(page.rootInstance.cardType).toBe('access');
  });

  it('renders access card with title and body', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="access" title-card="Mi título" body-text="Texto de prueba"></designio-card>`
    });

    const title = page.root.shadowRoot?.querySelector('sp-ml-access-card');
    expect(title).toBeTruthy();
    expect(title.getAttribute('titleLabel')).toBe('Mi título');
    expect(title.getAttribute('descLabel')).toBe('Texto de prueba');
  });

  it('renders notification card with options menu', async () => {
    const userOptions =
      '[{"icon":"ico-transfer","label":"Opción 1","value":"opt1"}]';
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="notification" user-options='${userOptions}'></designio-card>`
    });

    const notificationCard = page.root.shadowRoot?.querySelector(
      'sp-ml-notification-card'
    );
    expect(notificationCard).toBeTruthy();

    const valuesToCard = JSON.parse(
      notificationCard.getAttribute('valuesToCard')!
    );
    expect(valuesToCard[0].optionsMenu.length).toBe(1);
    expect(valuesToCard[0].optionsMenu[0].label).toBe('Opción 1');
  });

  it('emits cardClicked event', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card></designio-card>`
    });

    const spy = jest.fn();
    page.root.addEventListener('cardClicked', spy);
    page.rootInstance.onCardClicked(new Event('click'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('renders options menu when userOptions is provided', async () => {
    const userOptions =
      '[{"icon":"ico-transfer","label":"Opción 1","value":"opt1"},{"icon":"ico-transfer","label":"Opción 2","value":"opt2"}]';
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="notification" user-options='${userOptions}'></designio-card>`
    });

    const notificationCard = page.root.shadowRoot?.querySelector(
      'sp-ml-notification-card'
    );
    const valuesToCard = JSON.parse(
      notificationCard.getAttribute('valuesToCard')!
    );

    expect(valuesToCard[0].optionsMenu.length).toBe(2);
    expect(valuesToCard[0].optionsMenu[0].label).toBe('Opción 1');
  });

  it('renders with two buttons when hasButtons=true', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="notification" has-buttons="true" button-text="Aceptar" button-text-secondary="Cancelar"></designio-card>`
    });

    const notificationCard = page.root.shadowRoot?.querySelector(
      'sp-ml-notification-card'
    );
    const valuesToCard = JSON.parse(
      notificationCard.getAttribute('valuesToCard')!
    );

    expect(valuesToCard[0].buttons).toBe(true);
    expect(valuesToCard[0].textButton).toBe('Aceptar');
    expect(valuesToCard[0].textButton2).toBe('Cancelar');
  });

  it('renders bavv card with body text and props', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bavv" body-text="Texto Bavv" card-padding="24" card-has-border="true"></designio-card>`
    });

    const bavvCard = page.root.shadowRoot?.querySelector('bavv-designio-card');
    expect(bavvCard).toBeTruthy();
    expect(bavvCard.getAttribute('cardPadding')).toBe('24');
    expect(page.rootInstance.cardHasBorder).toBe(true);
    expect(bavvCard.textContent).toContain('Texto Bavv');
  });

  it('renders with custom borderType', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bocc" border-type="info"></designio-card>`
    });

    expect(page.rootInstance.borderType).toBe('info');
  });

  it('renders header and footer when displayHeader and displayFooter are true', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bocc" display-header="true" display-footer="true" header-text="Header" footer-text="Footer"></designio-card>`
    });

    const headerSlot = page.root.shadowRoot?.querySelector(
      'bdo-card div[slot="header-card"]'
    );
    const footerSlot = page.root.shadowRoot?.querySelector(
      'bdo-card div[slot="footer-card"]'
    );

    expect(headerSlot?.textContent).toBe('Header');
    expect(footerSlot?.textContent).toBe('Footer');
  });

  it('renders access card with avatar image', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="access" type-avatar="img" url-img-avatar="avatar.png"></designio-card>`
    });

    const accessCard = page.root.shadowRoot?.querySelector('sp-ml-access-card');
    expect(accessCard.getAttribute('typeAvatar')).toBe('img');
    expect(accessCard.getAttribute('urlImgAvatar')).toBe('avatar.png');
  });

  it('renders notification card with unread state', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="notification" unread="true"></designio-card>`
    });

    const notificationCard = page.root.shadowRoot?.querySelector(
      'sp-ml-notification-card'
    );
    const valuesToCard = JSON.parse(
      notificationCard.getAttribute('valuesToCard')!
    );

    expect(valuesToCard[0].unread).toBe(true);
  });

  it('emits linkClickedSecond event', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card></designio-card>`
    });

    const spy = jest.fn();
    page.root.addEventListener('linkClickedSecond', spy);
    page.rootInstance.onLinkClickedSecond(new Event('click'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('renders bavv card with border and padding 36', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bavv" card-has-border="true" card-padding="36"></designio-card>`
    });

    const bavvCard = page.root.shadowRoot?.querySelector('bavv-designio-card');
    expect(bavvCard.getAttribute('cardPadding')).toBe('36');
    expect(page.rootInstance.cardHasBorder).toBe(true);
  });

  it('renders notification card with title and body text', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="notification" title-card="Notificación" body-text="Contenido"></designio-card>`
    });

    const notificationCard = page.root.shadowRoot?.querySelector(
      'sp-ml-notification-card'
    );
    const valuesToCard = JSON.parse(
      notificationCard.getAttribute('valuesToCard')!
    );

    expect(valuesToCard[0].title).toBe('Notificación');
    expect(valuesToCard[0].desc).toBe('Contenido');
  });

  it('renders notification card with secondary button type', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="notification" button-type="secondary"></designio-card>`
    });

    const notificationCard = page.root.shadowRoot?.querySelector(
      'sp-ml-notification-card'
    );
    const valuesToCard = JSON.parse(
      notificationCard.getAttribute('valuesToCard')!
    );

    expect(valuesToCard[0].typeButton).toBe('secondary');
  });

  it('renders access card with pictogram type', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="access" type-picto="warning"></designio-card>`
    });

    const accessCard = page.root.shadowRoot?.querySelector('sp-ml-access-card');
    expect(accessCard.getAttribute('typePicto')).toBe('warning');
  });

  it('renders access card with titleHasOneLine disabled', async () => {
    const page = await newSpecPage({
      components: [DesignioCard],
      html: `<designio-card type="bbog" card-type="access" title-has-one-line="false"></designio-card>`
    });
    expect(page.rootInstance.titleHasOneLine).toBe(false);
  });
});
