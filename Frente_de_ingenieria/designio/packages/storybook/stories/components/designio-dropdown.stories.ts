import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Components/Designio Dropdown",
  tags: ["autodocs"],
  component: "designio-dropdown",
  argTypes: {
    type: {
      control: "select",
      options: ["bbog", "bavv", "bocc", "bpop"],
    },
    label: {
      control: "text",
      description: "Label del dropdown",
    },
    placeholder: {
      control: "text",
      description: "Texto placeholder",
    },
    helperText: {
      control: "text",
      description: "Texto de ayuda",
    },
    value: {
      control: "text",
    },
    state: {
      control: "select",
      options: ["default", "error", "warning", "selected"],
    },
    isDisabled: {
      control: "boolean",
    },
    isHelp: {
      control: "boolean",
      description: "Modo ayuda (SOLO BBOG)",
    },
    tooltip: {
      control: "boolean",
    },
    tooltipHeader: {
      control: "text",
    },
    tooltipMessage: {
      control: "text",
    },
    isPopUp: {
      control: "boolean",
    },
    options: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj;

// TEMPLATE -- dont touch

const Template = (args: any) => {
  const el = document.createElement("designio-dropdown");

  el.setAttribute("type", args.type ?? "bbog");

  if (args.label) el.setAttribute("label", args.label);
  if (args.placeholder) el.setAttribute("placeholder", args.placeholder);
  if (args.helperText) el.setAttribute("helper-text", args.helperText);
  if (args.state) el.setAttribute("state", args.state);
  if (args.isPopUp) el.setAttribute("is-popup", "true");

  el.setAttribute("is-disabled", String(!!args.isDisabled));
  el.setAttribute("is-help", String(!!args.isHelp));

  if (args.value !== undefined) {
    el.setAttribute("value", String(args.value));
  }

  if (args.tooltip) {
    el.setAttribute("tooltip", "true");
    el.setAttribute("tooltip-header", args.tooltipHeader ?? "Información");
    el.setAttribute(
      "tooltip-message",
      args.tooltipMessage ?? "Texto del tooltip",
    );
  }

  if (args.options) {
    el.setAttribute("options", JSON.stringify(args.options));
  }

  return el;
};

//BBOG

export const BBOG_Default: Story = {
  render: Template,
  args: {
    type: "bbog",
    label: "Seleccione una cuenta",
    placeholder: "Elija una opción",
    helperText: "Texto de ayuda",
    options: [
      { label: "Ahorros", value: "1" },
      { label: "Corriente", value: "2" },
    ],
  },
};

export const BBOG_Selected: Story = {
  render: Template,
  args: {
    ...BBOG_Default.args,
    value: "2",
  },
};

export const BBOG_Error: Story = {
  render: Template,
  args: {
    ...BBOG_Default.args,
    state: "error",
    helperText: "Hay un error en la selección",
  },
};

export const BBOG_Warning: Story = {
  render: Template,
  args: {
    ...BBOG_Default.args,
    state: "warning",
    helperText: "Revise esta selección",
  },
};

export const BBOG_Help: Story = {
  render: Template,
  args: {
    ...BBOG_Default.args,
    isHelp: true,
  },
};

export const BBOG_Disabled: Story = {
  render: Template,
  args: {
    ...BBOG_Default.args,
    isDisabled: true,
  },
};

export const BBOG_Tooltip: Story = {
  render: Template,
  args: {
    ...BBOG_Default.args,
    tooltip: true,
    tooltipHeader: "Información importante",
    tooltipMessage: "Esto es un tooltip informativo.",
  },
};

export const BBOG_LargeOptions: Story = {
  render: Template,
  args: {
    type: "bbog",
    label: "Muchas opciones",
    options: Array.from({ length: 40 }).map((_, i) => ({
      label: `Opción ${i + 1}`,
      value: `${i + 1}`,
    })),
  },
};

export const BBOG_Empty: Story = {
  render: Template,
  args: {
    type: "bbog",
    label: "Sin opciones",
    options: [],
  },
};

//BAVV

export const BAVV_Default: Story = {
  render: Template,
  args: {
    type: "bavv",
    label: "Selecciona una tarjeta",
    options: [
      { label: "AV Villas Débito", value: "1" },
      { label: "AV Villas Crédito", value: "2" },
    ],
  },
};

export const BAVV_Selected: Story = {
  render: Template,
  args: {
    ...BAVV_Default.args,
    value: "1",
  },
};

export const BAVV_Error: Story = {
  render: Template,
  args: {
    ...BAVV_Default.args,
    state: "error",
    helperText: "Campo requerido",
  },
};

export const BAVV_Disabled: Story = {
  render: Template,
  args: {
    ...BAVV_Default.args,
    isDisabled: true,
  },
};

//BOCC

export const BOCC_Default: Story = {
  render: Template,
  args: {
    type: "bocc",
    label: "Producto Occidente",
    options: [
      { label: "Ahorros Occidente", value: "1" },
      { label: "Corriente Occidente", value: "2" },
    ],
  },
};

export const BOCC_Selected: Story = {
  render: Template,
  args: {
    ...BOCC_Default.args,
    value: "2",
  },
};

export const BOCC_Error: Story = {
  render: Template,
  args: {
    ...BOCC_Default.args,
    helperText: "Error en la selección",
    state: "error",
  },
};

export const BOCC_Disabled: Story = {
  render: Template,
  args: {
    ...BOCC_Default.args,
    isDisabled: true,
  },
};

//BPOP

export const BPOP_Default: Story = {
  render: Template,
  args: {
    type: "bpop",
    label: "Cuenta Popular",
    options: [
      { label: "Cuenta Joven", value: "1" },
      { label: "Cuenta Digital", value: "2" },
    ],
  },
};

export const BPOP_Selected: Story = {
  render: Template,
  args: {
    ...BPOP_Default.args,
    value: "2",
  },
};

export const BPOP_Popup: Story = {
  render: Template,
  args: {
    ...BPOP_Default.args,
    isPopUp: true,
  },
};

export const BPOP_Disabled: Story = {
  render: Template,
  args: {
    ...BPOP_Default.args,
    isDisabled: true,
  },
};
