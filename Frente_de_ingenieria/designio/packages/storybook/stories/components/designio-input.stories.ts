export default {
  title: "Components/DesignioInput",
  tags: ["autodocs"],
  component: "designio-input",
  argTypes: {
    entity: {
      type: "string",
      description: "La entidad bancaria",
      control: "select",
      options: ["bocc", "bpop", "bavv", "bbog"],
      table: {
        defaultValue: { summary: "bbog" },
      },
    },
    type: {
      type: "string",
      description: "El tipo de input",
      control: "select",
      options: ["text", "number", "email", "password"],
      table: {
        defaultValue: { summary: "text" },
      },
    },
    label: {
      type: "string",
      description: "El texto mostrado como label",
      control: "text",
    },
    value: { type: "any", description: "El valor del input", control: "text" },
    placeholder: {
      type: "string",
      description:
        "El texto mostrado como placeholder cuando el input está vacío",
      control: "text",
    },
    idProp: {
      type: "string",
      description: "El atributo 'id' para el input",
      control: "text",
    },
    name: {
      type: "string",
      description: "El atributo name para el input",
      control: "text",
    },
    disabled: {
      type: "boolean",
      description:
        "Si el input está deshabilitado para BAVV, BPOP y BOCC. No aplica para BBOG.",
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    readonly: {
      type: "boolean",
      description: "Si el input es de solo lectura.",
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    required: {
      type: "boolean",
      description: "Si el input es requerido.",
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    min: {
      type: "string",
      description: "El valor mínimo aceptado en inputs de tipo number o date",
      control: "text",
    },
    max: {
      type: "string",
      description: "El valor máximo aceptado en inputs de tipo number o date",
      control: "text",
    },
    autocomplete: {
      type: "string",
      description: "El atributo autocomplete del input",
      control: "text",
      table: {
        defaultValue: { summary: "off" },
      },
    },
    pattern: {
      type: "string",
      description: "La expresión regular que debe obedecer el input",
      control: "text",
    },
    inputModeProp: {
      type: "string",
      description: "El tipo de teclado a mostrar en mobile",
      control: "text",
    },
    minLength: {
      type: "string",
      description:
        "El valor mínimo de caracteres aceptado en inputs de tipo number o date",
      control: "text",
    },
    maxLength: {
      type: "string",
      description:
        "El valor máximo de caracteres aceptado en inputs de tipo number o date",
      control: "text",
    },
    helper: {
      type: "string",
      description:
        "El texto que se muestra como ayuda debajo del input de BAVV, BPOP y BBOG. No aplica para BOCC",
      control: "text",
    },
    bavvIconName: {
      type: "string",
      description: "El nombre del ícono de BAVV.",
      control: "text",
    },
    bavvIconPosition: {
      type: "string",
      description: "La posición del ícono de BAVV.",
      control: "text",
    },
    bavvButtonText: {
      type: "string",
      description: "El texto del botón derecho del input de BAVV.",
      control: "text",
    },
    boccAttributes: {
      type: "object string",
      description: "Los atributos que permite el input de BOCC.",
      control: "text",
    },
    boccFieldStatus: {
      type: "object string",
      description: "El campo 'status' del input de BOCC.",
      control: "text",
    },
    boccMaximumDecimalsAllowed: {
      type: "number",
      description:
        "La cantidad máxima de decimales aceptada por el input de BOCC.",
      control: "number",
    },
    boccPrefixText: {
      type: "string",
      description: "El texto que se muestra como prefijo en el input de BOCC.",
      control: "text",
    },
    bpopStepSize: {
      type: "number",
      description:
        "El tamaño del paso en inputs de tipo number o date para BPOP.",
      control: "number",
    },
    bpopSize: {
      type: "number",
      description: "El atributo 'size' del input de BPOP.",
      control: "number",
    },
    bpopSpellcheckProp: {
      type: "text",
      description: "El atributo 'spellcheck' del input de BPOP.",
      control: "text",
    },
    bpopTabIndexProp: {
      type: "number",
      description: "'tabindex' para aplicar en BPOP.",
      control: "number",
    },
    bpopTitleProp: {
      type: "text",
      description: "El atributo 'title' del input de BPOP.",
      control: "text",
    },
    bpopAriaLabelProp: {
      type: "text",
      description: "El atributo 'aria-label' del input de BPOP.",
      control: "text",
    },
    bpopAriaDescribedBy: {
      type: "text",
      description: "El atributo 'aria-describedby' del input de BPOP.",
      control: "text",
    },
    bpopAutocapitalizeProp: {
      type: "text",
      description: "El atributo 'autocapitalize' del input de BPOP.",
      control: "text",
    },
    bpopIconName: {
      type: "string",
      description: "El nombre del ícono de BPOP.",
      control: "text",
    },
    bpopIconPosition: {
      type: "string",
      description: "La posición del ícono de BPOP.",
      control: "text",
    },
    bpopButtonText: {
      type: "string",
      description: "El texto del botón derecho del input de BPOP.",
      control: "text",
    },
    bbogIcon: {
      type: "string",
      description: "El nombre del ícono de la derecha de BBOG.",
      control: "text",
    },
    bbogStatus: {
      type: "string",
      description: "El status del input de BBOG.",
      control: "select",
      options: ["ENABLED", "DISABLED", "ERROR", "HELP", "DISMESSAGE"],
      table: {
        defaultValue: { summary: "ENABLED" },
      },
    },
    bbogPasswordMode: {
      type: "boolean",
      description: "Activa/Desactiva el modo de ocultar contraseña en BBOG.",
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    bbogTooltip: {
      type: "boolean",
      description: "Muestra/Oculta el tooltip en el label de BBOG.",
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    bbogTooltipMessage: {
      type: "string",
      description: "El texto que se muestra como tooltip en el label de BBOG.",
      control: "text",
    },
    bbogTooltipPosition: {
      type: "string",
      description: "La posición del tooltip en el label de BBOG.",
      control: "text",
      table: {
        defaultValue: { summary: "right" },
      },
    },
    bbogTooltipTitle: {
      type: "string",
      description: "El título del tooltip del label de BBOG.",
      control: "text",
    },
    bbogViewMode: {
      type: "boolean",
      description: "Activa/Desactiva el view mode de BBOG.",
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    bbogInteractiveTooltipMessage: {
      type: "string",
      description:
        "El texto que se muestra como tooltip interactivo en el label de BBOG.",
      control: "text",
    },
    bbogAutoSelect: {
      type: "boolean",
      description: "Activa/Desactiva el autoselect de BBOG.",
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    bbogEmailValidationOnBlur: {
      type: "boolean",
      description:
        "Activa/Desactiva el que al perder foco el input de BBOG se debe validar el email.",
      control: "boolean",
      table: {
        defaultValue: { summary: false },
      },
    },
    bbogLeftIcon: {
      type: "string",
      description: "El nombre del ícono de la izquierda de BBOG.",
      control: "text",
    },
    bbogDecimalQuantity: {
      type: "number",
      description:
        "La cantidad máxima de decimales aceptada por el input de BBOG.",
      control: "number",
    },
  },
};

const Template = (args: any) => {
  const element = document.createElement("designio-input");

  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      (element as any)[key] = value;
    }
  });

  return element;
};

export const BBOG = Template.bind({});
BBOG.args = {
  entity: "bbog",
  label: "Nombre",
  value: "Juan",
  placeholder: "Ingrese su nombre",
};

export const BPOP = Template.bind({});
BPOP.args = {
  entity: "bpop",
  label: "Correo electrónico",
  value: "juan@example.com",
  placeholder: "Ingrese su correo",
};

export const BAVV = Template.bind({});
BAVV.args = {
  entity: "bavv",
  label: "Teléfono",
  value: "123456789",
  placeholder: "Ingrese su teléfono",
};

export const BOCC = Template.bind({});
BOCC.args = {
  entity: "bocc",
  label: "Dirección",
  value: "Calle 123",
  placeholder: "Ingrese su dirección",
};
