import { defineCustomElements } from "../../../loader";
import { defineCustomElements as defineCustomElementsBocc } from "../../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bocc-designio/dist/loader";
import { defineCustomElements as defineCustomElementsBavv } from "../../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bavv-designio/dist/loader";
import { defineCustomElements as defineCustomElementsBpop } from "../../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio/dist/loader";
import { defineCustomElements as defineCustomElementsBbog } from "../../../loader";

defineCustomElements();
defineCustomElementsBocc();
defineCustomElementsBavv();
defineCustomElementsBpop();
defineCustomElementsBbog();

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Documentación", "Components"], // ← organiza el orden del menú
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs"]
};

export default preview;
