/* eslint-disable @stencil/community/own-props-must-be-private */

export default {
  title: "Components/DesignioButton",
  tags: ["autodocs"],
  component: "designio-button",
  parameters: {
    docs: {
      description: {
        component: `
# DesignioButton - Adapter Universal de Botones

El componente **DesignioButton** es un adapter que unifica los design systems de todos los bancos del grupo:

- **BOCC (Occidente)**: Utiliza bdo-button con variantes completas
- **BPOP (Popular)**: Utiliza bpop-designio-button con soporte de loading
- **BAVV (Villas)**: Utiliza bavv-designio-button con modos de ancho
- **BBOG (Bogotá)**: Utiliza botón HTML estándar

## Eventos
Todos los botones emiten el evento buttonClicked con la estructura:

\`\`\`javascript
{
  type: 'bocc', // Tipo de banco
  id: 'button-id', // ID del botón
  label: 'Texto', // Label del botón
  value: any // Valor adicional (solo BOCC)
}
\`\`\`

## Uso en Angular

\`\`\`html
<designio-button
  label="Mi Botón"
  type="bocc"
  variant-bocc="primary"
  size-bocc="M"
  (buttonClicked)="onButtonClick($event)">
</designio-button>
\`\`\`

## Uso en React

\`\`\`jsx
<designio-button
  label="Mi Botón"
  type="bpop"
  variant-bpop="primary"
  size-bpop="regular"
  onButtonClicked={handleClick}
/>
\`\`\`
        `,
      },
    },
    actions: {
      handles: ["buttonClicked"],
    },
  },
  args: {
    label: "Click Aquí",
    type: "bocc",
    isDisabled: false,
    isLoading: false,
    variantBocc: "primary",
    sizeBocc: "M",
    dividedBocc: false,
    variantBpop: "primary",
    sizeBpop: "regular",
    widthModeBpop: "default",
    variantBavv: "primary",
    sizeBavv: "regular",
    widthModeBavv: "default",
    prefixIcon: "",
    suffixIcon: "",
    idButton: "designio-btn",
    buttonType: "button",
    customWidth: "",      
    customHeight: "",     
    htmlIndex: 0,
    name: "",
  },
  argTypes: {
    label: {
      description: "Texto del botón",
      control: { type: "text" },
    },
    type: {
      description: "Tipo de botón (controla el adapter de diseño)",
      control: { type: "select" },
      options: ["bocc", "bpop", "bavv", "bbog"],
    },
    isDisabled: {
      description: "Deshabilita el botón",
      control: { type: "boolean" },
    },
    isLoading: {
      description: "Estado de carga (solo BPOP primary/secondary)",
      control: { type: "boolean" },
    },
    variantBocc: {
      description: "Variante para BOCC (Occidente)",
      control: { type: "select" },
      options: [
        "primary",
        "primaryWhite",
        "secondary",
        "secondaryWhite",
        "tertiary",
        "tertiaryWhithe",
        "tertiaryVariable",
        "link",
        "primaryDanger",
        "secondaryDanger",
        "tertiaryDanger",
        "tertiaryDangerVariable",
        "raised",
        "flat",
        "outline",
      ],
      if: { arg: "type", eq: "bocc" },
    },
    sizeBocc: {
      description: "Tamaño para BOCC",
      control: { type: "select" },
      options: ["S", "M", "L"],
      if: { arg: "type", eq: "bocc" },
    },
    dividedBocc: {
      description: "Divisor entre texto e icono (BOCC)",
      control: { type: "boolean" },
      if: { arg: "type", eq: "bocc" },
    },
    variantBpop: {
      description: "Variante para BPOP (Popular)",
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "text-primary",
        "text-secondary",
        "text-hiperlink",
      ],
      if: { arg: "type", eq: "bpop" },
    },
    sizeBpop: {
      description: "Tamaño para BPOP",
      control: { type: "select" },
      options: ["x-small", "small", "regular", "large"],
      if: { arg: "type", eq: "bpop" },
    },
    widthModeBpop: {
      description: "Modo de ancho para BPOP",
      control: { type: "select" },
      options: ["default", "full"],
      if: { arg: "type", eq: "bpop" },
    },
    variantBavv: {
      description: "Variante para BAVV (Villas)",
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "borderless"],
      if: { arg: "type", eq: "bavv" },
    },
    sizeBavv: {
      description: "Tamaño para BAVV",
      control: { type: "select" },
      options: ["small", "regular"],
      if: { arg: "type", eq: "bavv" },
    },
    widthModeBavv: {
      description: "Modo de ancho para BAVV",
      control: { type: "select" },
      options: ["default", "auto", "full"],
      if: { arg: "type", eq: "bavv" },
    },
    prefixIcon: {
      description: "Icono antes del texto (ej: warning-2, check, plus)",
      control: { type: "text" },
    },
    suffixIcon: {
      description: "Icono después del texto (ej: arrow-right, vel-money)",
      control: { type: "text" },
    },
    idButton: {
      description: "ID del botón",
      control: { type: "text" },
    },
    buttonType: {
      description: "Tipo HTML del botón",
      control: { type: "select" },
      options: ["button", "submit", "reset"],
    },
    htmlIndex: {
      description: "Índice HTML (tabindex)",
      control: { type: "number" },
    },
    name: {
      description: "Nombre del botón (para formularios)",
      control: { type: "text" },
    },
    customWidth: {
      description: "Ancho personalizado para el botón (solo BAVV)",
      control: { type: "text" },
      if: { arg: "type", eq: "bavv" },
    },
    customHeight: {
      description: "Alto personalizado para el botón (solo BAVV)",
      control: { type: "text" },
      if: { arg: "type", eq: "bavv" },
    },
    buttonClicked: {
      description: "Evento emitido al hacer clic en el botón",
      table: {
        type: { summary: "{ type, id, label, value }" },
      },
      action: "buttonClicked",
    },
  },
};

// Template base con <script> para eventos
const Template = (args: any) => {
  const prefixIconAttr = args.prefixIcon
    ? `prefix-icon="${args.prefixIcon}"`
    : "";
  const suffixIconAttr = args.suffixIcon
    ? `suffix-icon="${args.suffixIcon}"`
    : "";
  const nameAttr = args.name ? `name="${args.name}"` : "";
  const customWidthAttr = args.customWidth
    ? `custom-width="${args.customWidth}"`
    : "";
  const customHeightAttr = args.customHeight
    ? `custom-height="${args.customHeight}"`
    : "";

  return `
    <designio-button
      label="${args.label}"
      type="${args.type}"
      ${args.isDisabled ? 'is-disabled="true"' : ""}
      ${args.isLoading ? 'is-loading="true"' : ""}
      variant-bocc="${args.variantBocc}"
      size-bocc="${args.sizeBocc}"
      ${args.dividedBocc ? 'divided-bocc="true"' : ""}
      variant-bpop="${args.variantBpop}"
      size-bpop="${args.sizeBpop}"
      width-mode-bpop="${args.widthModeBpop}"
      variant-bavv="${args.variantBavv}"
      size-bavv="${args.sizeBavv}"
      width-mode-bavv="${args.widthModeBavv}"
      ${prefixIconAttr}
      ${suffixIconAttr}
      custom-width="${args.customWidth}"
      custom-height="${args.customHeight}"
      id-button="${args.idButton}"
      button-type="${args.buttonType}"
      html-index="${args.htmlIndex}"
      ${nameAttr}
    ></designio-button>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
        if (window.__STORYBOOK_ADDONS_MANAGER) {
          window.__STORYBOOK_ADDONS_MANAGER.getChannel().emit('storybook/actions/action-event', {
            id: 'buttonClicked',
            count: 1,
            data: { args: [event.detail] }
          });
        }
      });
    </script>
  `;
};

// ========== STORIES INTERACTIVAS ==========

export const Interactive = {
  render: Template,
  args: {
    label: "Botón Interactivo",
    type: "bocc",
    variantBocc: "primary",
    sizeBocc: "M",
  },
};

// ========== STORIES DE BOCC ==========

export const BoccPrimary = {
  render: Template,
  args: {
    label: "BOCC Primary",
    type: "bocc",
    variantBocc: "primary",
    sizeBocc: "M",
    prefixIcon: "warning-2",
  },
};

export const BoccSecondary = {
  render: Template,
  args: {
    label: "BOCC Secondary",
    type: "bocc",
    variantBocc: "secondary",
    sizeBocc: "M",
    suffixIcon: "arrow-right",
  },
};

export const BoccDanger = {
  render: Template,
  args: {
    label: "BOCC Danger",
    type: "bocc",
    variantBocc: "primaryDanger",
    sizeBocc: "L",
    suffixIcon: "warning-2",
    dividedBocc: true,
  },
};

export const BoccAllSizes = {
  render: () => `
    <div style="display: flex; gap: 10px; align-items: center;">
      <designio-button label="Small" type="bocc" variant-bocc="primary" size-bocc="S"></designio-button>
      <designio-button label="Medium" type="bocc" variant-bocc="primary" size-bocc="M"></designio-button>
      <designio-button label="Large" type="bocc" variant-bocc="primary" size-bocc="L"></designio-button>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

export const BoccAllVariants = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 20px 0;">
      <designio-button label="Primary" type="bocc" variant-bocc="primary" size-bocc="M"></designio-button>
      <designio-button label="Secondary" type="bocc" variant-bocc="secondary" size-bocc="M"></designio-button>
      <designio-button label="Tertiary" type="bocc" variant-bocc="tertiary" size-bocc="M"></designio-button>
      <designio-button label="Link" type="bocc" variant-bocc="link" size-bocc="M"></designio-button>
      <designio-button label="Primary Danger" type="bocc" variant-bocc="primaryDanger" size-bocc="M"></designio-button>
      <designio-button label="Secondary Danger" type="bocc" variant-bocc="secondaryDanger" size-bocc="M"></designio-button>
      <designio-button label="Outline" type="bocc" variant-bocc="outline" size-bocc="M"></designio-button>
      <designio-button label="Raised" type="bocc" variant-bocc="raised" size-bocc="M"></designio-button>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

// ========== STORIES DE BPOP ==========

export const BpopPrimary = {
  render: Template,
  args: {
    label: "BPOP Primary",
    type: "bpop",
    variantBpop: "primary",
    sizeBpop: "regular",
    prefixIcon: "vel-money",
  },
};

export const BpopLoading = {
  render: Template,
  args: {
    label: "BPOP Loading",
    type: "bpop",
    variantBpop: "primary",
    sizeBpop: "large",
    isLoading: true,
  },
};

export const BpopFullWidth = {
  render: Template,
  args: {
    label: "BPOP Full Width",
    type: "bpop",
    variantBpop: "secondary",
    sizeBpop: "regular",
    widthModeBpop: "full",
  },
};

export const BpopAllSizes = {
  render: () => `
    <div style="display: flex; gap: 10px; align-items: center;">
      <designio-button label="X-Small" type="bpop" variant-bpop="primary" size-bpop="x-small"></designio-button>
      <designio-button label="Small" type="bpop" variant-bpop="primary" size-bpop="small"></designio-button>
      <designio-button label="Regular" type="bpop" variant-bpop="primary" size-bpop="regular"></designio-button>
      <designio-button label="Large" type="bpop" variant-bpop="primary" size-bpop="large"></designio-button>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

export const BpopAllVariants = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 15px;">
      <div style="display: flex; gap: 10px; align-items: center;">
        <designio-button label="Primary" type="bpop" variant-bpop="primary" size-bpop="regular"></designio-button>
        <designio-button label="Secondary" type="bpop" variant-bpop="secondary" size-bpop="regular"></designio-button>
      </div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <designio-button label="Text Primary" type="bpop" variant-bpop="text-primary" size-bpop="regular"></designio-button>
        <designio-button label="Text Secondary" type="bpop" variant-bpop="text-secondary" size-bpop="regular"></designio-button>
        <designio-button label="Text Hiperlink" type="bpop" variant-bpop="text-hiperlink" size-bpop="regular"></designio-button>
      </div>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

// ========== STORIES DE BAVV ==========

export const BavvPrimary = {
  render: Template,
  args: {
    label: "BAVV Primary",
    type: "bavv",
    variantBavv: "primary",
    sizeBavv: "regular",
    prefixIcon: "plus",
  },
};

export const BavvSecondary = {
  render: Template,
  args: {
    label: "BAVV Secondary",
    type: "bavv",
    variantBavv: "secondary",
    sizeBavv: "regular",
    suffixIcon: "arrow-right",
  },
};

export const BavvBorderless = {
  render: Template,
  args: {
    label: "BAVV Borderless",
    type: "bavv",
    variantBavv: "borderless",
    sizeBavv: "small",
    widthModeBavv: "auto",
  },
};

export const BavvAllSizes = {
  render: () => `
    <div style="display: flex; gap: 10px; align-items: center;">
      <designio-button label="Small" type="bavv" variant-bavv="primary" size-bavv="small"></designio-button>
      <designio-button label="Regular" type="bavv" variant-bavv="primary" size-bavv="regular"></designio-button>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

export const BavvWidthModes = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 15px;">
      <div style="border: 1px dashed #ccc; padding: 10px;">
        <p><strong>Default:</strong></p>
        <designio-button label="Default Width" type="bavv" variant-bavv="primary" width-mode-bavv="default"></designio-button>
      </div>
      <div style="border: 1px dashed #ccc; padding: 10px;">
        <p><strong>Auto:</strong></p>
        <designio-button label="Auto Width" type="bavv" variant-bavv="primary" width-mode-bavv="auto"></designio-button>
      </div>
      <div style="border: 1px dashed #ccc; padding: 10px;">
        <p><strong>Full:</strong></p>
        <designio-button label="Full Width" type="bavv" variant-bavv="primary" width-mode-bavv="full"></designio-button>
      </div>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

export const BavvAllVariants = {
  render: () => `
    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
      <designio-button label="Primary" type="bavv" variant-bavv="primary" size-bavv="regular"></designio-button>
      <designio-button label="Secondary" type="bavv" variant-bavv="secondary" size-bavv="regular"></designio-button>
      <designio-button label="Tertiary" type="bavv" variant-bavv="tertiary" size-bavv="regular"></designio-button>
      <designio-button label="Borderless" type="bavv" variant-bavv="borderless" size-bavv="regular"></designio-button>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

// ========== STORIES DE BBOG ==========

export const BbogSimple = {
  render: Template,
  args: {
    label: "BBOG Simple",
    type: "bbog",
    buttonType: "button",
  },
};

export const BbogSubmit = {
  render: Template,
  args: {
    label: "BBOG Submit",
    type: "bbog",
    buttonType: "submit",
    name: "submit-btn",
  },
};

export const BbogWithIcons = {
  render: () => `
    <div style="display: flex; gap: 10px; align-items: center;">
      <designio-button label="Con Prefix" type="bbog" prefix-icon="check"></designio-button>
      <designio-button label="Con Suffix" type="bbog" suffix-icon="arrow-right"></designio-button>
      <designio-button label="Con Ambos" type="bbog" prefix-icon="warning-2" suffix-icon="arrow-right"></designio-button>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

// ========== STORIES COMPARATIVOS ==========

export const AllBanksComparison = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <h3 style="margin: 0; color: #333;">Comparación de todos los bancos</h3>
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <designio-button label="BOCC" type="bocc" variant-bocc="primary" size-bocc="M"></designio-button>
        <designio-button label="BPOP" type="bpop" variant-bpop="primary" size-bpop="regular"></designio-button>
        <designio-button label="BAVV" type="bavv" variant-bavv="primary" size-bavv="regular"></designio-button>
        <designio-button label="BBOG" type="bbog"></designio-button>
      </div>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

export const WithIcons = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <h3 style="margin: 0; color: #333;">Botones con iconos</h3>
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <designio-button label="BOCC" type="bocc" variant-bocc="primary" prefix-icon="warning-2"></designio-button>
        <designio-button label="BPOP" type="bpop" variant-bpop="primary" suffix-icon="vel-money"></designio-button>
        <designio-button label="BAVV" type="bavv" variant-bavv="primary" prefix-icon="plus" suffix-icon="arrow-right"></designio-button>
        <designio-button label="BBOG" type="bbog" prefix-icon="check"></designio-button>
      </div>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

export const DisabledStates = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <h3 style="margin: 0; color: #333;">Estados deshabilitados</h3>
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <designio-button label="BOCC Disabled" type="bocc" variant-bocc="primary" is-disabled="true"></designio-button>
        <designio-button label="BPOP Disabled" type="bpop" variant-bpop="primary" is-disabled="true"></designio-button>
        <designio-button label="BAVV Disabled" type="bavv" variant-bavv="primary" is-disabled="true"></designio-button>
        <designio-button label="BBOG Disabled" type="bbog" is-disabled="true"></designio-button>
      </div>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

export const LoadingStates = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <h3 style="margin: 0; color: #333;">Estados de carga</h3>
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <designio-button label="BPOP Primary Loading" type="bpop" variant-bpop="primary" is-loading="true"></designio-button>
        <designio-button label="BPOP Secondary Loading" type="bpop" variant-bpop="secondary" is-loading="true"></designio-button>
      </div>
      <p style="font-size: 14px; color: #666; margin: 0;">
        <strong>Nota:</strong> El estado de loading solo está disponible para BPOP con variantes primary y secondary.
      </p>
    </div>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

export const FormExample = {
  render: () => `
    <form onsubmit="event.preventDefault(); alert('Formulario enviado!');" style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; max-width: 400px;">
      <h3 style="margin-top: 0;">Ejemplo de formulario</h3>
      <div style="margin-bottom: 15px;">
        <label for="email" style="display: block; margin-bottom: 5px;">Email:</label>
        <input type="email" id="email" name="email" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      </div>
      <div style="margin-bottom: 20px;">
        <label for="password" style="display: block; margin-bottom: 5px;">Password:</label>
        <input type="password" id="password" name="password" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      </div>
      <div style="display: flex; gap: 10px;">
        <designio-button label="Enviar" type="bpop" variant-bpop="primary" button-type="submit" width-mode-bpop="full"></designio-button>
        <designio-button label="Cancelar" type="bavv" variant-bavv="borderless" button-type="button"></designio-button>
      </div>
    </form>
    <script>
      document.addEventListener('buttonClicked', (event) => {
        console.log('🚀 Botón clickeado:', event.detail);
      });
    </script>
  `,
};

export const EventTesting = {
  render: () => {
    return `
      <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0;">Testing de Eventos</h3>
        <p>Haz clic en cualquier botón y observa los eventos en la consola del navegador y en la pestaña "Actions" de Storybook.</p>
        <div style="display: flex; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
          <designio-button label="BOCC Event" type="bocc" variant-bocc="primary" id-button="bocc-test"></designio-button>
          <designio-button label="BPOP Event" type="bpop" variant-bpop="primary" id-button="bpop-test"></designio-button>
          <designio-button label="BAVV Event" type="bavv" variant-bavv="primary" id-button="bavv-test"></designio-button>
          <designio-button label="BBOG Event" type="bbog" id-button="bbog-test"></designio-button>
        </div>
        <div id="event-log" style="background: #f5f5f5; padding: 10px; border-radius: 4px; max-height: 200px; overflow-y: auto;">
          <strong>Event Log:</strong>
          <div id="events"></div>
        </div>
        <script>
          const eventsContainer = document.getElementById('events');
          let eventCount = 0;
          document.addEventListener('buttonClicked', (event) => {
            eventCount++;
            const eventDiv = document.createElement('div');
            eventDiv.style.marginBottom = '5px';
            eventDiv.innerHTML = 
              '<strong>Event #' + eventCount + ':</strong> ' +
              'Type: <code>' + event.detail.type + '</code>, ' +
              'ID: <code>' + event.detail.id + '</code>, ' +
              'Label: <code>' + (event.detail.label ?? '') + '</code>';
            eventsContainer.appendChild(eventDiv);
            eventsContainer.scrollTop = eventsContainer.scrollHeight;
          });
        </script>
      `;
  },
};
