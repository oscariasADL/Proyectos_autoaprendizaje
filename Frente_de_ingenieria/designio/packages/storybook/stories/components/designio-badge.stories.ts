/* eslint-disable @stencil/community/own-props-must-be-private */

export default {
  title: "Components/DesignioBadge",
  tags: ["autodocs"],
  component: "designio-badge",
  parameters: {
    docs: {
      description: {
        component: `
# DesignioBadge - Adapter Universal de Badges

El componente **DesignioBadge** unifica los badges de los distintos design systems:

- **BOCC (Occidente)**: usa \`bdo-badge\`
- **BPOP (Popular)**: usa \`bpop-designio-badge\`
- **BAVV (Villas)**: usa \`bavv-designio-badge\`
- **BBOG (Bogotá)**: fallback nativo simple (\`<span>\`)

Se controla mediante la prop \`type\` y, según el banco elegido, solo aplica las props correspondientes.

## Evento
Disponible para \`bpop\`, \`bavv\` y \`bbog\`. (No aplica para \`bocc\`.)
Emite \`badgeClicked\` con:
\`\`\`javascript
{ type: 'bocc'|'bpop'|'bavv'|'bbog', id: string, label?: string }
\`\`\`
        `,
      },
    },
    actions: {
      handles: ["badgeClicked"],
    },
  },
  decorators: [
    (Story: any, context: any) => {
      const VARIANT_OPTIONS: Record<string, string[]> = {
        bpop: ["error", "info", "success", "warning", "default", "neutral"],
        bocc: [
          "orange",
          "red",
          "green",
          "blue",
          "purple",
          "grey",
          "white",
          "orange-Satured",
          "red-Satured",
          "green-Satured",
          "blue-Satured",
          "purple-Satured",
          "grey-Satured",
          "white-Satured",
          "orange-Onlymessage",
          "red-Onlymessage",
          "green-Onlymessage",
          "blue-Onlymessage",
          "purple-Onlymessage",
          "grey-Onlymessage",
          "white-Onlymessage",
          "orange-Onlymessage-Satured",
          "red-Onlymessage-Satured",
          "green-Onlymessage-Satured",
          "blue-Onlymessage-Satured",
          "purple-Onlymessage-Satured",
          "grey-Onlymessage-Satured",
          "white-Onlymessage-Satured",
        ],
        bavv: ["default", "info", "success", "warning", "error", "disabled"],
        bbog: ["success", "warning", "error", "info", "disabled"],
      };
      const SIZE_OPTIONS: Record<string, string[]> = {
        bpop: ["medium", "small", "xsmall"],
        bocc: ["large", "medium", "small", "extra-small"],
      };
      const ICON_OPTIONS: Record<string, string[]> = {
        bpop: [
          "vel-money-circle",
          "vel-qr-code",
          "vel-smartphone",
          "vel-lock",
          "vel-eye-off",
          "vel-eye",
          "vel-add-circle",
          "vel-arrow-left-right",
          "vel-arrow-right-s",
          "vel-arrow-up-s",
          "vel-bank-card",
          "vel-file-text-line",
          "vel-file-text-money",
          "vel-filter",
          "vel-search",
          "vel-subtract-circle",
          "vel-wallet",
          "vel-check",
          "vel-arrow-down",
          "vel-trash",
          "vel-money-progress",
          "vel-calendar",
          "vel-arrows-transfer",
          "vel-add-progress",
          "vel-face-wrong",
          "vel-notification-bell",
          "vel-success-hand",
          "vel-warning-hex",
        ],
        bocc: [
          "accessibility-2",
          "accessibility-2",
          "add-page",
          "airplay-signal-airdrop",
          "alarm-clock-time-add-1",
          "alarm-clock-time-add-2",
        ],
      };
      const type = context.args?.type || "bocc";
      const opts = VARIANT_OPTIONS[type] || [];
      if (context.argTypes?.variant) {
        context.argTypes.variant.options = opts;
        context.argTypes.variant.control = { type: "select" };
      }
      const sizeVisible = type === "bpop" || type === "bocc";
      const sizeOpts = SIZE_OPTIONS[type];

      if (context.argTypes?.size) {
        if (sizeVisible && sizeOpts) {
          context.argTypes.size.options = sizeOpts;
          context.argTypes.size.control = { type: "select" };
          context.argTypes.size.table = {
            ...(context.argTypes.size.table || {}),
            disable: false,
          };
        } else {
          context.argTypes.size.options = undefined;
          context.argTypes.size.control = false as any;
          context.argTypes.size.table = {
            ...(context.argTypes.size.table || {}),
            disable: true,
          };
        }
      }
      // Visibility/enablement para prefixIcon/suffixIcon según type
      const iconOpts = ICON_OPTIONS[type];
      const prefixVisible = type === "bpop" || type === "bocc";

      if (context.argTypes?.prefixIcon) {
        context.argTypes.prefixIcon.table = {
          ...(context.argTypes.prefixIcon.table || {}),
          disable: !prefixVisible,
        };
        if (prefixVisible) {
          context.argTypes.prefixIcon.options = iconOpts || [];
          context.argTypes.prefixIcon.control = { type: "select" };
        } else {
          context.argTypes.prefixIcon.options = undefined;
          context.argTypes.prefixIcon.control = false as any;
        }
      }
      const suffixVisible = type === "bpop";
      if (context.argTypes?.suffixIcon) {
        context.argTypes.suffixIcon.table = {
          ...(context.argTypes.suffixIcon.table || {}),
          disable: !suffixVisible,
        };
        if (suffixVisible) {
          context.argTypes.suffixIcon.options = iconOpts || [];
          context.argTypes.suffixIcon.control = { type: "select" };
        } else {
          context.argTypes.suffixIcon.options = undefined;
          context.argTypes.suffixIcon.control = false as any;
        }
      }
      return Story();
    },
  ],
  args: {
    label: "Badge",
    type: "bocc",
    idBadge: "designio-badge",
    variant: "error",
    // Variantes por entidad (controladas por type)
    size: "medium",
    prefixIcon: "",
    suffixIcon: "",
    // BOCC
    isVisible: true,
    isSquare: false,
    // BAVV
    shape: "rounded",
    // BBOG
    isSolid: false,
    removeTag: false,
  },
  argTypes: {
    // COMUNES
    label: {
      description: "Contenido texto del badge",
      control: { type: "text" },
    },
    type: {
      description: "Tipo de badge (bocc, bpop, bavv, bbog)",
      control: { type: "select" },
      options: ["bocc", "bpop", "bavv", "bbog"],
    },
    idBadge: {
      description: "Identificador del badge",
      control: { type: "text" },
    },

    // VARIANT (dinámico según type)
    variant: {
      description: "Variante (opciones cambian según el type seleccionado)",
      control: { type: "select" },
      options: ["error", "info", "success", "warning", "default", "neutral"],
    },

    size: {
      description:
        "Tamaño (BPOP: medium|small|xsmall, BOCC: large|medium|small|extra-small)",
      control: { type: "select" },
      options: ["medium"], // será reemplazado por el decorador
      if: { arg: "type", in: ["bpop", "bocc"] },
    },
    prefixIcon: {
      description: "Ícono prefijo (BPOP/BOCC)",
      control: { type: "text" },
      if: { arg: "type", in: ["bpop", "bocc"] },
    },
    suffixIcon: {
      description: "Ícono sufijo (BPOP)",
      control: { type: "select" }, // opciones se asignan dinámicamente en el decorador
      if: { arg: "type", eq: "bpop" },
    },

    // BOCC

    isVisible: {
      description: "Visibilidad del badge (BOCC)",
      control: { type: "boolean" },
      if: { arg: "type", eq: "bocc" },
    },
    // Nota: 'size' ya definido arriba como control unificado
    isSquare: {
      description: "Define si el badge es cuadrado (BOCC)",
      control: { type: "boolean" },
      if: { arg: "type", eq: "bocc" },
    },

    // BAVV
    shape: {
      description: "Forma del borde (BAVV)",
      control: { type: "select" },
      options: ["rounded", "left", "right", "cornerRight", "cornerLeft"],
      if: { arg: "type", eq: "bavv" },
    },
    // BBOG
    isSolid: {
      description: "Fondo sólido (BBOG)",
      control: { type: "boolean" },
      if: { arg: "type", eq: "bbog" },
    },
    removeTag: {
      description: "Mostrar botón de remover (BBOG)",
      control: { type: "boolean" },
      if: { arg: "type", eq: "bbog" },
    },

    // EVENTO
    badgeClicked: {
      description: "Evento emitido al hacer clic en el badge",
      table: {
        type: { summary: "{ type, id, label }" },
      },
      action: "badgeClicked",
      if: { arg: "type", neq: "bocc" },
    },
  },
};

const Template = (args: any) => {
  const prefixIconAttr =
    args.prefixIcon && (args.type === "bpop" || args.type === "bocc")
      ? `prefix-icon="${args.prefixIcon}"`
      : "";
  const suffixIconAttr =
    args.suffixIcon && args.type === "bpop"
      ? `suffix-icon="${args.suffixIcon}"`
      : "";

  const variantValue = args.variant;

  return `
    <designio-badge
      label="${args.label ?? ""}"
      type="${args.type}"
      id-badge="${args.idBadge ?? ""}"
      variant="${variantValue}"
      ${args.type === "bpop" ? `size="${args.size}"` : ""}
      ${prefixIconAttr}

      ${suffixIconAttr}
      ${args.type === "bocc" && args.isVisible ? "is-visible" : ""}

     
      ${args.type === "bocc" && args.size ? `size="${args.size}"` : ""}
      ${args.type === "bocc" && args.isSquare ? 'is-square="true"' : ""}
      ${args.type === "bavv" && args.shape ? `shape="${args.shape}"` : ""}
      ${args.type === "bbog" && args.isSolid ? 'is-solid="true"' : ""}
      ${args.type === "bbog" && args.removeTag ? 'remove-tag="true"' : ""}
    ></designio-badge>
    <script>
      document.addEventListener('badgeClicked', (event) => {
        console.log('🏷️ Badge clickeado:', event.detail);
        if (window.__STORYBOOK_ADDONS_MANAGER) {
          window.__STORYBOOK_ADDONS_MANAGER.getChannel().emit('storybook/actions/action-event', {
            id: 'badgeClicked',
            count: 1,
            data: { args: [event.detail] }
          });
        }
      });
    </script>
  `;
};

// ========== STORY INTERACTIVA ==========
export const Interactive = {
  render: Template,
  args: {
    label: "BPOP Success",
    type: "bpop",
    variant: "success",
    size: "medium",
  },
};

// ========== STORIES BPOP ==========
export const BpopWithIcons = {
  render: Template,
  args: {
    label: "BPOP con iconos",
    type: "bpop",
    variant: "info",
    size: "small",
    prefixIcon: "info",
    suffixIcon: "check",
  },
};

export const BpopAllStates = {
  render: () => `
    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
      <designio-badge type="bpop" label="Default" variant="default"></designio-badge>
      <designio-badge type="bpop" label="Neutral" variant="neutral"></designio-badge>
      <designio-badge type="bpop" label="Info" variant="info"></designio-badge>
      <designio-badge type="bpop" label="Success" variant="success"></designio-badge>
      <designio-badge type="bpop" label="Warning" variant="warning"></designio-badge>
      <designio-badge type="bpop" label="Error" variant="error"></designio-badge>
    </div>
  `,
};

// ========== STORIES BOCC ==========
export const BoccPrimary = {
  render: Template,
  args: {
    label: "BOCC Primary",
    type: "bocc",
    variant: "green",
    size: "medium",
    isVisible: true,
  },
};

export const BoccSquareWithIcon = {
  render: Template,
  args: {
    label: "BOCC Cuadrado",
    type: "bocc",
    variant: "orange",
    size: "large",
    isSquare: true,
  },
};

// ========== STORIES BAVV ==========
export const BavvSuccessRounded = {
  render: Template,
  args: {
    label: "BAVV Success",
    type: "bavv",
    variant: "success",
    shape: "rounded",
  },
};

export const BavvCorners = {
  render: () => `
    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
      <designio-badge type="bavv" label="Corner Right" variant="info" shape="cornerRight"></designio-badge>
      <designio-badge type="bavv" label="Corner Left" variant="warning" shape="cornerLeft"></designio-badge>
      <designio-badge type="bavv" label="Left" variant="error" shape="left"></designio-badge>
      <designio-badge type="bavv" label="Right" variant="success" shape="right"></designio-badge>
    </div>
  `,
};

// ========== STORY BBOG ==========
export const BbogSimple = {
  render: () => `
  <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
    <designio-badge type="bbog" label="Corner Right" variant="success" isSolid="true" ></designio-badge>
    <designio-badge type="bbog" label="Corner Left" variant="warning" isSolid="true" ></designio-badge>
    <designio-badge type="bbog" label="Left" variant="error" isSolid="true" ></designio-badge>
    <designio-badge type="bbog" label="Right" variant="info" isSolid="true" ></designio-badge>
    <designio-badge type="bbog" label="Right" variant="disabled" isSolid="true" ></designio-badge>

    <designio-badge type="bbog" label="Corner Right" variant="success" isSolid="false"></designio-badge>
    <designio-badge type="bbog" label="Corner Left" variant="warning" isSolid="false" ></designio-badge>
    <designio-badge type="bbog" label="Left" variant="error" isSolid="false" ></designio-badge>
    <designio-badge type="bbog" label="Right" variant="info" isSolid="false" ></designio-badge>
    <designio-badge type="bbog" label="Right" variant="disabled" isSolid="false" ></designio-badge>
  </div>
`,
};
