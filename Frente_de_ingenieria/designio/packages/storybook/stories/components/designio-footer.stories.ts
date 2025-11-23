import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Components/Designio Footer",
  tags: ["autodocs"],
  component: "designio-footer",
  argTypes: {
    type: {
      control: "select",
      options: ["bavv", "bocc", "bpop", "bbog"],
    },
    variant: {
      control: "select",
      options: ["default", "landing"],
      description: "Variante para AVVillas",
    },
    showAdditionalText: {
      control: "boolean",
      description: "Muestra texto adicional (solo BAVV)",
    },
    additionalText: {
      control: "text",
      description: "Texto adicional cuando showAdditionalText está activo",
    },
    showFogafinLogo: {
      control: "boolean",
      description: "Muestra el logo de Fogafín (solo BAVV Landing)",
    },
    elementId: {
      control: "text",
      description: "ID del footer BOCC",
    },
  },
};

export default meta;
type Story = StoryObj;

const Template = (args: any) => {
  const el = document.createElement("designio-footer");

  el.setAttribute("type", args.type ?? "bavv");

  if (args.variant) el.setAttribute("variant", args.variant);
  el.setAttribute("show-additional-text", String(!!args.showAdditionalText));
  if (args.additionalText)
    el.setAttribute("additional-text", args.additionalText);
  el.setAttribute("show-fogafin-logo", String(!!args.showFogafinLogo));

  if (args.elementId) el.setAttribute("element-id", args.elementId);

  if (args.iconLeft) {
    const leftImg = document.createElement("img");
    leftImg.slot = "icon-left";
    leftImg.src = args.iconLeft;
    el.appendChild(leftImg);
  }

  if (args.iconRight) {
    const rightImg = document.createElement("img");
    rightImg.slot = "icon-right";
    rightImg.src = args.iconRight;
    el.appendChild(rightImg);
  }

  return el;
};

export const BAVV_Default_NoText: Story = {
  render: Template,
  args: {
    type: "bavv",
    variant: "default",
  },
};

export const BAVV_Default_WithText: Story = {
  render: Template,
  args: {
    type: "bavv",
    variant: "default",
    showAdditionalText: true,
    additionalText: "Este es un texto adicional para el footer de AV Villas.",
  },
};

export const BAVV_Landing_WithFogafinAndText: Story = {
  render: Template,
  args: {
    type: "bavv",
    variant: "landing",
    showAdditionalText: true,
    additionalText: "Tus depósitos están protegidos por Fogafín.",
    showFogafinLogo: true,
  },
};

export const BAVV_Landing_WithFogafin_NoText: Story = {
  render: Template,
  args: {
    type: "bavv",
    variant: "landing",
    showFogafinLogo: true,
  },
};

export const BPOP_Placeholder: Story = {
  render: Template,
  args: {
    type: "bpop",
  },
};

export const BBOG_Placeholder: Story = {
  render: Template,
  args: {
    type: "bbog",
  },
};

export const BOCC_Default_NoIcons: Story = {
  render: Template,
  args: {
    type: "bocc",
    elementId: "bdo-footer-company",
  },
};

export const BOCC_IconRight: Story = {
  render: Template,
  args: {
    type: "bocc",
    elementId: "footer-right",
    iconRight: "./assets/icon-right.svg",
  },
};

export const BOCC_IconLeft: Story = {
  render: Template,
  args: {
    type: "bocc",
    elementId: "footer-left",
    iconLeft: "./assets/icon-left.svg",
  },
};

export const BOCC_LeftRight: Story = {
  render: Template,
  args: {
    type: "bocc",
    elementId: "footer-both",
    iconLeft: "./assets/icon-left.svg",
    iconRight: "./assets/icon-right.svg",
  },
};
