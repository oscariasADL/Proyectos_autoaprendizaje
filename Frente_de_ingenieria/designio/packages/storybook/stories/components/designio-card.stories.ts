
export default {
    title: 'Components/Designio Card',
    tags: ['autodocs'],
    component: 'designio-card',
    argTypes: {
        type: {
            description: 'Tipo de entidad de la card',
            control: { type: 'select' },
            options: ['bocc', 'bpop', 'bavv', 'bbog'],
            table: {
                defaultValue: { summary: "bocc" },
            },
        },
        cardType: {
            description: 'Tipo de card en BBOG',
            control: { type: 'select' },
            options: ['access', 'notification'],
            table: {
                defaultValue: { summary: "access" },
            },
        },
        idCard: {
            description: 'id del elemento card',
            control: { type: 'text' }
        },
        idFooter: {
            description: 'id del footer (BOCC)',
            control: { type: 'text' }
        },
        idHeader: {
            description: 'id del header (BOCC)',
            control: { type: 'text' }
        },
        displayHeader: {
            description: 'Muestra header (BOCC)',
            control: { type: 'boolean' }
        },
        displayFooter: {
            description: 'Muestra footer (BOCC)',
            control: { type: 'boolean' }
        },
        borderType: {
            description: 'Tipo de borde (BOCC)',
            control: { type: 'select' },
            options: ['default', 'info', 'success', 'danger'],
            table: {
                defaultValue: { summary: "default" },
            },
        },
        cardPadding: {
            description: 'Padding (BAVV)',
            control: { type: 'select' },
            options: [12, 24, 36],
            table: {
                defaultValue: { summary: 12 },
            },
        },
        cardHasBorder: {
            description: 'Muestra borde (BAVV)',
            control: { type: 'boolean' }
        },
        bodyText: {
            description: 'Texto principal',
            control: { type: 'text' }
        },
        secondaryText: {
            description: 'Texto secundario (BBOG)',
            control: { type: 'text' }
        },
        footerText: {
            description: 'Texto footer (BOCC)',
            control: { type: 'text' }
        },
        headerText: {
            description: 'Texto header (BOCC)',
            control: { type: 'text' }
        },
        buttonText: {
            description: 'Texto botón (BBOG)',
            control: { type: 'text' }
        },
        buttonTextSecondary: {
            description: 'Texto botón secundario (BBOG)',
            control: { type: 'text' }
        },
        tagLabel: {
            description: 'Etiqueta (tag) (BBOG)',
            control: { type: 'text' }
        },
        typeLogo: {
            description: 'Tipo logo (access) (BBOG)',
            control: { type: 'text' }
        },
        boxWidth: {
            description: 'Ancho contenedor (access) (BBOG)',
            control: { type: 'text' }
        },
        boxHeight: {
            description: 'Alto contenedor (access) (BBOG)',
            control: { type: 'text' }
        },
        hasButtons: {
            description: 'Dos botones (notification) o botón en vez de link (access) (BBOG)',
            control: { type: 'boolean' },
        },
        titleCard: {
            description: 'Título card (BBOG)',
            control: { type: 'text' }
        },
        typeIcon: {
            description: 'Tipo ícono (BBOG)',
            control: { type: 'text' }
        },
        typeTag: {
            description: 'Tipo de tag (BBOG)',
            control: { type: 'text' }
        },
        typeAvatar: {
            description: 'Tipo avatar (BBOG)',
            control: { type: 'select' },
            options: ['text', 'icon', 'img'],
            table: {
                defaultValue: { summary: "icon" },
            },
        },
        textAvatar: {
            description: 'Texto avatar (BBOG)',
            control: { type: 'text' }
        },
        isTagSolid: {
            description: 'Define el tag con borde o sólido (BBOG)',
            control: { type: 'boolean' }
        },
        urlImgAvatar: {
            description: 'Imagen avatar (BBOG)',
            control: { type: 'text' }
        },
        titleHasOneLine: {
            description: 'Define el título en una sola línea (BBOG)',
            control: { type: 'boolean' }
        },
        enable: {
            description: 'Habilitar componente card (access)/avatar (notification) (BBOG)',
            control: { type: 'boolean' }
        },
        colorTextAvatar: {
            description: 'Color de fondo del avatar de tipo texto o ícono (BBOG)',
            control: { type: 'text' }
        },
        typePicto: {
            description: 'Tipo pictograma (access) (BBOG)',
            control: { type: 'text' }
        },
        buttonType: {
            description: 'Botón o link (access) (BBOG)',
            control: { type: 'select' },
            options: ['link', 'secondary'],
            table: {
                defaultValue: { summary: "link" },
            },
        },
        unread: {
            description: 'Estado leída/no leída (notification) (BBOG)',
            control: { type: 'boolean' }
        },
        userOptions: {
            description: 'Items menú contextual (notification)(BBOG) Ej: [{"label":"Opción 1","action":"action1", "value": "opt1"},{"label":"Opción 2","action":"action2",  "value": "opt2"}]',
            control: { type: 'text' },
        },
        cardClicked: {
            description: "Evento emitido al hacer clic en la card (BBOG)",
            action: "cardClicked",
        },
        onLinkClicked: {
            description: "Evento emitido al hacer clic en el link (BBOG)",
            action: "linkClicked",
        },
        onLinkClickedSecond: {
            description: "Evento emitido al hacer clic en el boton secundario (BBOG notification)",
            action: "linkClickedSecond",
        },
        onOptionMenuClicked: {
            description: "Evento emitido al hacer clic en las opciones del menú (BBOG notification)",
            action: "onOptionMenuClicked",
        },
    },
};


const Template = (args: any) => {
  const card = document.createElement('designio-card');
  if (args.type) card.setAttribute('type', args.type);
  if (args.cardType) card.setAttribute('card-type', args.cardType);
  if (args.idCard) card.setAttribute('id-card', args.idCard);
  if (args.idHeader) card.setAttribute('id-header', args.idHeader);
  if (args.idFooter) card.setAttribute('id-footer', args.idFooter);
  if (args.displayHeader) card.setAttribute('display-header', String(args.displayHeader));
  if (args.displayFooter) card.setAttribute('display-footer', String(args.displayFooter));
  if (args.borderType) card.setAttribute('border-type', args.borderType);
  if (args.cardPadding) card.setAttribute('card-padding', args.cardPadding);
  if (args.cardHasBorder) card.setAttribute('card-has-border', String(args.cardHasBorder));
  if (args.tagLabel) card.setAttribute('tag-label', args.tagLabel);
  if (args.typeLogo) card.setAttribute('type-logo', args.typeLogo);
  if (args.boxWidth) card.setAttribute('box-width', args.boxWidth);
  if (args.boxHeight) card.setAttribute('box-height', args.boxHeight);
  if (args.colorTextAvatar) card.setAttribute('color-text-avatar', args.colorTextAvatar);
  if (args.typePicto) card.setAttribute('type-picto', args.typePicto);
  if (args.buttonType) card.setAttribute('button-type', args.buttonType);
  if (args.unread) card.setAttribute('unread', String(args.unread));
  if (args.bodyText) card.setAttribute('body-text', args.bodyText);
  if (args.titleCard) card.setAttribute('title-card', args.titleCard);
  if (args.headerText) card.setAttribute('header-text', args.headerText);
  if (args.footerText) card.setAttribute('footer-text', args.footerText);
  if (args.hasButtons) card.setAttribute('has-buttons', String(args.hasButtons));
  if (args.buttonText) card.setAttribute('button-text', args.buttonText);
  if (args.buttonTextSecondary) card.setAttribute('button-text-secondary', args.buttonTextSecondary);
  if (args.secondaryText) card.setAttribute('secondary-text', args.secondaryText);
  if (args.typeIcon) card.setAttribute('type-icon', args.typeIcon);
  if (args.typeTag) card.setAttribute('type-tag', args.typeTag);
  if (args.typeAvatar) card.setAttribute('type-avatar', args.typeAvatar);
  if (args.textAvatar) card.setAttribute('text-avatar', args.textAvatar);
  if (args.isTagSolid) card.setAttribute('is-tag-solid', String(args.isTagSolid));
  if (args.urlImgAvatar) card.setAttribute('url-img-avatar', args.urlImgAvatar);
  if (args.titleHasOneLine) card.setAttribute('title-has-one-line', String(args.titleHasOneLine));
  if (args.enable) card.setAttribute('enable', String(args.enable));
  if (args.userOptions) card.setAttribute('user-options', JSON.stringify(args.userOptions));


  if (!args.headerText) {
    const headerSlot = document.createElement('div');
    headerSlot.setAttribute('slot', 'header-card');
    headerSlot.innerHTML = `<p>Ejemplo de contenido insertado con <strong>HTML</strong></p>`;
    card.appendChild(headerSlot);
  }

  if (!args.bodyText) {
    const bodySlot = document.createElement('div');
    bodySlot.setAttribute('slot', 'body-card');
    bodySlot.innerHTML = `<designio-button type="${args.type}" label="Botón Body"></designio-button>`;
    card.appendChild(bodySlot);
  }

  if (!args.footerText) {
    const footerSlot = document.createElement('div');
    footerSlot.setAttribute('slot', 'footer-card');
    footerSlot.innerHTML = `<designio-button type="${args.type}" label="Botón Footer"></designio-button>`;
    card.appendChild(footerSlot);
  }

  if (typeof args.onCardClicked === 'function') {
    card.addEventListener('cardClicked', args.onCardClicked);
  }
  if (typeof args.onLinkClicked === 'function') {
    card.addEventListener('linkClicked', args.onLinkClicked);
  }
  if (typeof args.onLinkClickedSecond === 'function') {
    card.addEventListener('linkClickedSecond', args.onLinkClickedSecond);
  }
  if (typeof args.onOptionMenuClicked === 'function') {
    card.addEventListener('optionMenuClicked', args.onOptionMenuClicked);
  }

  return card;
};

// Stories
export const BOCC = Template.bind({});
BOCC.args = {
    type: 'bocc',
    bodyText: 'Este es el cuerpo de la card',
    displayHeader: true,
    displayFooter: true,
};

export const BAVV = Template.bind({});
BAVV.args = {
    type: 'bavv',
    bodyText: 'Este es el cuerpo de la card',
    cardHasBorder: true,
};
export const BAVVSlot = Template.bind({});
BAVVSlot.args = {
    type: 'bavv',
    cardHasBorder: true,
};
export const Bbogaccess = Template.bind({});
Bbogaccess.args = {
    type: 'bbog',
    cardType: 'access',
    bodyText: 'Este es el cuerpo (access)',
    titleCard: 'Título BBOG',
    hasButtons: true,
    buttonText: 'Botón BBOG',
    tagLabel: 'Tag',

};
// Historia para card con link
export const Bbogaccesslink = Template.bind({});
Bbogaccesslink.args = {
    type: 'bbog',
    cardType: 'access',
    bodyText: 'Este es el cuerpo (access)',
    titleCard: 'Título BBOG',
    hasButtons: false,
    buttonText: 'Botón BBOG',
    tagLabel: 'Tag',
    isTagSolid: true,
};
export const Bbognotification = Template.bind({});
Bbognotification.args = {
    type: 'bbog',
    cardType: 'notification',
    bodyText: 'Este es el cuerpo (notification)',
    titleCard: 'Título BBOG',
    buttonText: 'Botón BBOG',
    buttonType: 'secondary',
    userOptions: '[{"label":"Opción 1","action":"action1", "value": "opt1"},{"label":"Opción 2","action":"action2",  "value": "opt2"}]',
};
export const Bbognotificationtwoactions = Template.bind({});
Bbognotificationtwoactions.args = {
    type: 'bbog',
    cardType: 'notification',
    bodyText: 'Este es el cuerpo (notification)',
    titleCard: 'Título BBOG',
    buttonText: 'Botón BBOG',
    hasButtons: true,
    buttonTextSecondary: 'Link BBOG',
    userOptions: '[{"label":"Opción 1","action":"action1", "value": "opt1"},{"label":"Opción 2","action":"action2",  "value": "opt2"}]'
};
// Historia para card sin leer
export const Bbognotificacionunread = Template.bind({});
Bbognotificacionunread.args = {
    type: 'bbog',
    cardType: 'notification',
    bodyText: 'Este es el cuerpo (notification)',
    titleCard: 'Título BBOG',
    buttonText: 'Botón BBOG',
    unread: true,
    userOptions: '[{"label":"Opción 1","action":"action1", "value": "opt1"},{"label":"Opción 2","action":"action2",  "value": "opt2"}]'
};
