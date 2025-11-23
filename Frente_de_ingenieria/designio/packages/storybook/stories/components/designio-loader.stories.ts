export default {
  title: 'Components/DesignioLoader',
  tags: ['autodocs'],
  component: 'designio-loader',
  decorators: [
    (story) => `
      <div style="position: relative; height: 400px; width: 100%; border: 1px solid #ccc; overflow: hidden;">
        ${story()}
      </div>
    `,
  ],
  args: {
    type: 'bavv',
    isopen: true,
    mainText: 'Cargando...',
    secondaryText: 'Espere un momento...',
    autoPlay: true,
    fileAnimation: '',
    idEl: 'designio-loader',
    loop: true,
    loaderType: 'shortTime',
    displayMessage: true,
    isMainSpinner: true,
    size: 'medium',
  },
  argTypes: {
    type: {
      description: 'Tipo de entidad del loader',
      control: { type: 'select' },
      options: ['bocc', 'bpop', 'bavv', 'bbog'],
    },
    isopen: {
      description: 'Hace visible u oculta el loader',
      control: { type: 'boolean' },
    },
    mainText: {
      description: 'Texto principal del loader (disponible para todos los tipos)',
      control: { type: 'text' },
    },
    secondaryText: {
      description: 'Texto secundario del loader (disponible para BOCC, BAVV)',
      control: { type: 'text' },
    },
    autoPlay: {
      description: 'Inicia la animación automáticamente al cargar el componente (BBOG)',
      control: { type: 'boolean' },
    },
    fileAnimation: {
      description: 'Archivo JSON externo para la animación (BBOG)',
      control: { type: 'text' },
    },
    idEl: {
      description: 'ID del elemento loader (BBOG)',
      control: { type: 'text' },
    },
    loop: {
      description: 'Reproduce la animación en bucle (BBOG)',
      control: { type: 'boolean' },
    },
    loaderType: {
      description: 'Tipo de loader específico (BBOG)',
      control: { type: 'text' },
    },
    displayMessage: {
      description: 'Muestra un mensaje cuando el loader está abierto (BOCC)',
      control: { type: 'boolean' },
    },
    isMainSpinner: {
      description: 'Variante del spinner principal (BAVV)',
      control: { type: 'boolean' },
    },
    size: {
      description: 'Tamaño del loader (BPOP)',
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large'],
    },
  },
};

// Template para los stories
const Template = (args) => `
  <designio-loader
    type="${args.type}"
    ${args.isopen ? 'isopen="true"' : 'isopen="false"'}
    mainText="${args.mainText || ''}"
    secondaryText="${args.secondaryText || ''}"
    ${args.autoPlay ? 'autoPlay="true"' : 'autoPlay="false"'}
    fileAnimation="${args.fileAnimation || ''}"
    idEl="${args.idEl || ''}"
    ${args.loop ? 'loop="true"' : 'loop="false"'}
    loaderType="${args.loaderType || ''}"
    ${args.displayMessage ? 'displayMessage="true"' : 'displayMessage="false"'}
    ${args.isMainSpinner ? 'isMainSpinner="true"' : 'isMainSpinner="false"'}
    size="${args.size || ''}"
  ></designio-loader>
`;

// Historia base
export const Default = Template.bind({});
Default.args = {
  type: 'bavv',
  isopen: true,
  mainText: 'Cargando...',
  secondaryText: 'Espere un momento...',
  isMainSpinner: true,
};

export const BOCC = Template.bind({});
BOCC.args = {
  type: 'bocc',
  isopen: true,
  displayMessage: true,
};

export const BPOP = Template.bind({});
BPOP.args = {
  type: 'bpop',
  isopen: true,
  mainText: 'Cargando datos',
  size: 'medium',
};

export const BAVV = Template.bind({});
BAVV.args = {
  type: 'bavv',
  isopen: true,
  mainText: 'Cargando contenido',
  secondaryText: 'Un momento por favor',
  isMainSpinner: false,
};

// Historia para BBOG
export const BBOG = Template.bind({});
BBOG.args = {
  type: 'bbog',
  isopen: true,
  mainText: 'Estamos procesando tu solicitud',
  autoPlay: true,
  loop: true,
  loaderType: 'shortTime',
  idEl: 'bbog-loader',
};

// Historia con loader cerrado
export const Closed = Template.bind({});
Closed.args = {
  type: 'bavv',
  isopen: false,
  mainText: 'Este loader está cerrado',
};
