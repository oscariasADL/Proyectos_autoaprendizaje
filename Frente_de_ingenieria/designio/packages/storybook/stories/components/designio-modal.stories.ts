import { html } from 'lit-html';

const baseArgs = {
  modalTitle: 'Título del Modal',
  subtitle: 'Subtítulo del Modal',
  icon: 'info',
  illustratedIcon: 'ahorro',
  showClose: true,
  alignTitle: 'center',
  customClass: '',
  showPrimaryButton: true,
  showSecondaryButton: true,
  direction: 'vertical',
  size: 'md',
  hideClose: false,
  modalId: '',
};

export default {
  title: 'Components/Modal',
  component: 'designio-modal',
  tags: ['autodocs'],
  argTypes: {
    modalTitle: { 
      control: 'text', 
      description: 'Título del modal',
      table: { category: 'Props' }
    },
    subtitle: { 
      control: 'text', 
      description: 'Subtítulo del modal',
      table: { category: 'Props' }
    },
    icon: { 
      control: 'text', 
      description: 'Icono para BOCC/BPOP',
      table: { category: 'Props' }
    },
    illustratedIcon: { 
      control: 'text', 
      description: 'Icono ilustrado para BAVV',
      table: { category: 'Props' }
    },
    showClose: { 
      control: 'boolean', 
      description: 'Mostrar botón de cerrar',
      table: { category: 'Props' }
    },
    alignTitle: { 
      control: { type: 'select' }, 
      options: ['left', 'center', 'right'], 
      description: 'Alineación del título',
      table: { category: 'Props' }
    },
    showPrimaryButton: { 
      control: 'boolean', 
      description: 'Mostrar botón primario',
      table: { category: 'Props' }
    },
    showSecondaryButton: { 
      control: 'boolean', 
      description: 'Mostrar botón secundario',
      table: { category: 'Props' }
    },
    direction: { 
      control: { type: 'select' }, 
      options: ['horizontal', 'vertical'], 
      description: 'Dirección de los botones (BPOP)',
      table: { category: 'Props' }
    },
    size: { 
      control: { type: 'select' }, 
      options: ['lg', 'md', 'sm'], 
      description: 'Tamaño del modal (BBOG)',
      table: { category: 'Props' }
    },
    hideClose: { 
      control: 'boolean', 
      description: 'Ocultar botón de cerrar (BBOG)',
      table: { category: 'Props' }
    },
    modalId: { 
      control: 'text', 
      description: 'ID personalizado del modal (BBOG)',
      table: { category: 'Props' }
    },
    customClass: { 
      control: 'text', 
      description: 'Clase CSS personalizada',
      table: { category: 'Props' }
    },
  },
};

function createModal(type, args, suffix = '') {
  const modalId = `designio-modal-${type}${suffix}`;
  let extraProps = '';
  
  // Props específicas por tipo
  if (type === 'bavv' && args.illustratedIcon && args.illustratedIcon !== 'none') {
    extraProps += ` illustrated-icon="${args.illustratedIcon}"`;
  }
  if ((type === 'bocc' || type === 'bpop') && args.icon) {
    extraProps += ` icon="${args.icon}"`;
  }
  if (args.showPrimaryButton !== undefined) extraProps += ` show-primary-button="${args.showPrimaryButton}"`;
  if (args.showSecondaryButton !== undefined) extraProps += ` show-secondary-button="${args.showSecondaryButton}"`;
  if (type === 'bpop' && args.direction) extraProps += ` direction="${args.direction}"`;
  if (type === 'bbog' && args.size) extraProps += ` size="${args.size}"`;
  if (type === 'bbog' && args.hideClose !== undefined) extraProps += ` hide-close="${args.hideClose}"`;
  if (type === 'bbog' && args.modalId) extraProps += ` modal-id="${args.modalId}"`;
  if (args.customClass) extraProps += ` custom-class="${args.customClass}"`;

  // Contenido específico por tipo de modal
  let contentSlot = '';
  if (type === 'bbog') {
    // Contenido más rico para BBOG que usa el slot body-modal
    contentSlot = `
      <div slot="content">
        <p>🏛️ Este es el contenido del modal <strong>BBOG (Sherpa)</strong>.</p>
        <div style="background: #f0f8ff; padding: 12px; border-radius: 4px; margin: 16px 0; border-left: 4px solid #2196f3;">
          <h4 style="margin: 0 0 8px 0; color: #1976d2;">📋 Información del Modal Sherpa</h4>
          <ul style="margin: 8px 0; padding-left: 16px;">
            <li><strong>Slot:</strong> Usa <code>body-modal</code> internamente</li>
            <li><strong>Tamaño:</strong> ${args.size || 'md'}</li>
            <li><strong>Backdrop:</strong> Se cierra al hacer clic fuera</li>
            <li><strong>ID Modal:</strong> ${args.modalId || 'auto-generado'}</li>
          </ul>
        </div>
        <p>🔧 <strong>Propiedades específicas de BBOG:</strong></p>
        <ul>
          <li><code>size-modal</code>: lg | md | sm</li>
          <li><code>hide-close</code>: Ocultar botón cerrar</li>
          <li><code>id-modal</code>: ID personalizado</li>
          <li><code>back-drop-close</code>: Cerrar al clic en backdrop</li>
        </ul>
        <div style="margin-top: 16px; padding: 8px; background: #e8f5e8; border-radius: 4px;">
          ✅ El modal BBOG se integra correctamente con el adapter <code>designio-modal</code>
        </div>
      </div>
    `;
  } else {
    // Contenido genérico para otros tipos
    contentSlot = `
      <div slot="content">
        <p>Este es el contenido del modal <strong>${type.toUpperCase()}</strong>.</p>
        <p>Puedes personalizar este contenido usando el slot "content".</p>
        <ul>
          <li>Elemento de ejemplo 1</li>
          <li>Elemento de ejemplo 2</li>
          <li>Elemento de ejemplo 3</li>
        </ul>
      </div>
    `;
  }

  return html`
    <designio-modal
      id="${modalId}"
      type="${type}"
      modal-title="${args.modalTitle}"
      subtitle="${args.subtitle}"
      show-close="${args.showClose}"
      align-title="${args.alignTitle}"
      ${extraProps}
    >
      ${contentSlot}
    </designio-modal>
  `;
}

function setupModalEvents(type, suffix = '') {
  const modalId = `designio-modal-${type}${suffix}`;
  const buttonId = `open-modal-btn-${type}${suffix}`;
  
  return html`
    <script>
      (() => {
        setTimeout(() => {
          const button = document.getElementById('${buttonId}');
          const modal = document.getElementById('${modalId}');
          const eventOutput = document.getElementById('event-output');
          
          if (button && modal) {
            function logEvent(eventType, detail) {
              if (eventOutput) {
                const timestamp = new Date().toLocaleTimeString();
                eventOutput.innerHTML += \`<div style="margin-bottom: 4px; padding: 4px 8px; background: #e3f2fd; border-radius: 4px; font-size: 11px; font-family: monospace;">[\${timestamp}] \${eventType} - \${JSON.stringify(detail)}</div>\`;
                eventOutput.scrollTop = eventOutput.scrollHeight;
              }
            }

            // Event listeners
            modal.addEventListener('opened', (e) => logEvent('opened', e.detail));
            modal.addEventListener('closed', (e) => logEvent('closed', e.detail));
            
            button.onclick = async () => {
              try {
                await modal.openModal();
                logEvent('openModal()', { type: '${type}', modalId: '${modalId}' });
              } catch (error) {
                logEvent('error', { message: error.message });
              }
            };
          }
        }, 100);
      })();
    </script>
  `;
}

// Story principal con todos los tipos
export const AllTypes = (args) => html`
  <div style="padding: 20px;">
    <!-- Botones para abrir modales -->
    <div style="display: flex; gap: 16px; margin-bottom: 24px; justify-content: center; flex-wrap: wrap;">
      <button 
        id="open-modal-btn-bocc" 
        style="
          background: #1976d2; 
          color: white; 
          border: none; 
          padding: 12px 24px; 
          border-radius: 6px; 
          cursor: pointer;
          font-weight: 500;
          min-width: 140px;
        "
      >
        BOCC (Occidente)
      </button>
      
      <button 
        id="open-modal-btn-bpop" 
        style="
          background: #388e3c; 
          color: white; 
          border: none; 
          padding: 12px 24px; 
          border-radius: 6px; 
          cursor: pointer;
          font-weight: 500;
          min-width: 140px;
        "
      >
        BPOP (Popular)
      </button>
      
      <button 
        id="open-modal-btn-bavv" 
        style="
          background: #f57c00; 
          color: white; 
          border: none; 
          padding: 12px 24px; 
          border-radius: 6px; 
          cursor: pointer;
          font-weight: 500;
          min-width: 140px;
        "
      >
        BAVV (Villas)
      </button>
      
      <button 
        id="open-modal-btn-bbog" 
        style="
          background: #7b1fa2; 
          color: white; 
          border: none; 
          padding: 12px 24px; 
          border-radius: 6px; 
          cursor: pointer;
          font-weight: 500;
          min-width: 140px;
        "
      >
        BBOG (Bogotá)
      </button>
    </div>

    <!-- Información sobre las diferencias -->
    <div style="
      background: #f8f9fa; 
      border-radius: 8px; 
      padding: 16px; 
      margin-bottom: 24px; 
      border-left: 4px solid #2196f3;
    ">
      <h3 style="margin: 0 0 12px 0; color: #1976d2;">💡 Diferencias por Entidad</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 14px;">
        <div><strong>BOCC:</strong> Usa prop <code>icon</code></div>
        <div><strong>BPOP:</strong> Usa prop <code>icon</code> + <code>direction</code></div>
        <div><strong>BAVV:</strong> Usa prop <code>illustrated-icon</code></div>
        <div><strong>BBOG:</strong> Usa props <code>size</code>, <code>hide-close</code>, <code>modal-id</code></div>
      </div>
    </div>

    <!-- Log de eventos -->
    <div style="margin-bottom: 24px;">
      <h3 style="margin: 0 0 8px 0; color: #333;">📋 Log de Eventos</h3>
      <div
        id="event-output"
        style="
          height: 150px;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px;
          background: #fafafa;
          overflow-y: auto;
          font-family: monospace;
          font-size: 11px;
        "
      >
        <div style="color: #666; font-style: italic;">Los eventos del modal aparecerán aquí...</div>
      </div>
      <button 
        onclick="document.getElementById('event-output').innerHTML = '<div style=&quot;color: #666; font-style: italic;&quot;>Log limpiado...</div>'"
        style="
          margin-top: 8px;
          background: #666;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        "
      >
        Limpiar Log
      </button>
    </div>

    <div style="color: #666; text-align: center; font-style: italic;">
      Usa los controles de Storybook para modificar las props y prueba los diferentes tipos de modal.
    </div>
  </div>

  <!-- Modales -->
  ${createModal('bocc', args)}
  ${createModal('bpop', args)}
  ${createModal('bavv', args)}
  ${createModal('bbog', args)}
  
  <!-- Scripts -->
  ${setupModalEvents('bocc')}
  ${setupModalEvents('bpop')}
  ${setupModalEvents('bavv')}
  ${setupModalEvents('bbog')}
`;

AllTypes.args = { ...baseArgs };

// Stories individuales simplificados
export const BOCC = (args) => html`
  <div style="text-align: center; padding: 20px;">
    <button id="open-modal-btn-bocc-single" style="margin-bottom: 20px; padding: 12px 24px; background: #1976d2; color: white; border: none; border-radius: 6px; cursor: pointer;">
      Abrir Modal BOCC
    </button>
    ${createModal('bocc', args, '-single')}
    ${setupModalEvents('bocc', '-single')}
  </div>
`;
BOCC.args = { ...baseArgs, icon: 'warning-2' };

export const BPOP = (args) => html`
  <div style="text-align: center; padding: 20px;">
    <button id="open-modal-btn-bpop-single" style="margin-bottom: 20px; padding: 12px 24px; background: #388e3c; color: white; border: none; border-radius: 6px; cursor: pointer;">
      Abrir Modal BPOP
    </button>
    ${createModal('bpop', args, '-single')}
    ${setupModalEvents('bpop', '-single')}
  </div>
`;
BPOP.args = { ...baseArgs, icon: 'vel-idea', direction: 'horizontal' };

export const BAVV = (args) => html`
  <div style="text-align: center; padding: 20px;">
    <button id="open-modal-btn-bavv-single" style="margin-bottom: 20px; padding: 12px 24px; background: #f57c00; color: white; border: none; border-radius: 6px; cursor: pointer;">
      Abrir Modal BAVV
    </button>
    ${createModal('bavv', args, '-single')}
    ${setupModalEvents('bavv', '-single')}
  </div>
`;
BAVV.args = { ...baseArgs, illustratedIcon: 'ahorro', alignTitle: 'left' };

export const BBOG = (args) => html`
  <div style="text-align: center; padding: 20px;">
    <button id="open-modal-btn-bbog-single" style="margin-bottom: 20px; padding: 12px 24px; background: #7b1fa2; color: white; border: none; border-radius: 6px; cursor: pointer;">
      Abrir Modal BBOG
    </button>
    ${createModal('bbog', args, '-single')}
    ${setupModalEvents('bbog', '-single')}
  </div>
`;
BBOG.args = { ...baseArgs, size: 'lg', hideClose: false, modalId: 'bbog-demo' };