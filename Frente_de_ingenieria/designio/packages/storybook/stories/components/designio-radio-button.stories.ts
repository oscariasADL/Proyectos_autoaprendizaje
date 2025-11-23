import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/DesignioRadioButton',
  component: 'designio-radio-button',
  tags: ['autodocs'],
  args: {
    type: 'bpop',
    radioId: 'radio-1',
    label: 'Option 1',
    name: 'example-group',
    value: 'value-1',
    checked: false,
    disabled: false,
    showLabel: true,
    container: false,
    invertLabel: false,
    allowUnselect: false,
    state: 'default',
    size: 'default',
    radioChange: action('radioChange')
  },
  argTypes: {
    type: { control: 'select', options: ['bpop', 'bavv', 'bocc', 'bbog'] },
    radioId: { control: 'text' },
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    container: { control: 'boolean' },
    invertLabel: { control: 'boolean' },
    allowUnselect: { control: 'boolean' },
    state: { control: 'select', options: ['default', 'hover', 'error', 'info', 'disabled', 'checked'] },
    size: { control: 'select', options: ['default', 'large', 'medium', 'small'] },
    radioChange: { table: { disable: true } }
  }
};

const Template = (args: any) => {
  const id = `story-radio-${Math.random().toString(36).slice(2)}`;
  return `
    <div id="${id}">
      <designio-radio-button
        type="${args.type}"
        radio-id="${args.radioId}"
        label="${args.label}"
        name="${args.name}"
        value="${args.value}"
        ${args.checked ? 'checked' : ''}
        ${args.disabled ? 'disabled' : ''}
        ${args.showLabel ? 'show-label' : ''}
        ${args.container ? 'container' : ''}
        ${args.invertLabel ? 'invert-label' : ''}
        ${args.allowUnselect ? 'allow-unselect' : ''}
        state="${args.state}"
        size="${args.size}"
      ></designio-radio-button>
    </div>
    <script>
      (function(){
        var root=document.getElementById('${id}');
        if(!root) return;
        var el=root.querySelector('designio-radio-button');
        if(!el) return;
        el.addEventListener('radioChange', function(e){ (${args.radioChange})(e.detail); });
      })();
    </script>
  `;
};

export const BpopDefault = Template.bind({});
BpopDefault.args = {
  type: 'bpop',
  label: 'BPOP Radio',
  radioId: 'bpop-radio-1',
  size: 'large',
  container: true
};

export const BpopChecked = Template.bind({});
BpopChecked.args = {
  ...BpopDefault.args,
  radioId: 'bpop-radio-2',
  label: 'BPOP Checked',
  checked: true,
  state: 'checked'
};

export const BavvDefault = Template.bind({});
BavvDefault.args = {
  type: 'bavv',
  label: 'BAVV Radio',
  radioId: 'bavv-radio-1',
  checked: false
};

export const BoccInvert = Template.bind({});
BoccInvert.args = {
  type: 'bocc',
  label: 'BOCC Inverted',
  radioId: 'bocc-radio-1',
  invertLabel: true
};

export const BbogSimple = Template.bind({});
BbogSimple.args = {
  type: 'bbog',
  label: 'BBOG Radio',
  radioId: 'bbog-radio-1',
  name: '' // single instance (no group) ensures render
};

export const GroupBpop = () => {
  const gid = `group-bpop-${Math.random().toString(36).slice(2)}`;
  return `
    <div id="${gid}" style="display:flex;gap:16px;">
      <designio-radio-button type="bpop" radio-id="g-bpop-1" name="grp-bpop" value="A" label="A"></designio-radio-button>
      <designio-radio-button type="bpop" radio-id="g-bpop-2" name="grp-bpop" value="B" label="B" checked></designio-radio-button>
      <designio-radio-button type="bpop" radio-id="g-bpop-3" name="grp-bpop" value="C" label="C" disabled></designio-radio-button>
    </div>
    <script>
      (function(){
        var root=document.getElementById('${gid}');
        if(!root) return;
        root.querySelectorAll('designio-radio-button').forEach(function(el){
          el.addEventListener('radioChange', function(e){ (${action('radioChange')})(e.detail); });
        });
      })();
    </script>
  `;
};
GroupBpop.parameters = { controls: { disable: true } };

export const GroupBavv = () => {
  const gid = `group-bavv-${Math.random().toString(36).slice(2)}`;
  return `
    <div id="${gid}" style="display:flex;gap:16px;">
      <designio-radio-button type="bavv" radio-id="g-bavv-1" name="grp-bavv" value="X" label="X"></designio-radio-button>
      <designio-radio-button type="bavv" radio-id="g-bavv-2" name="grp-bavv" value="Y" label="Y" checked></designio-radio-button>
      <designio-radio-button type="bavv" radio-id="g-bavv-3" name="grp-bavv" value="Z" label="Z"></designio-radio-button>
    </div>
    <script>
      (function(){
        var root=document.getElementById('${gid}');
        if(!root) return;
        root.querySelectorAll('designio-radio-button').forEach(function(el){
          el.addEventListener('radioChange', function(e){ (${action('radioChange')})(e.detail); });
        });
      })();
    </script>
  `;
};
GroupBavv.parameters = { controls: { disable: true } };

export const GroupBbogAggregator = () => {
  const gid = `group-bbog-${Math.random().toString(36).slice(2)}`;
  return `
    <div id="${gid}">
      <designio-radio-button type="bbog" radio-id="g-bbog-1" name="grp-bbog" value="opt1" label="Opción 1"></designio-radio-button>
      <designio-radio-button type="bbog" radio-id="g-bbog-2" name="grp-bbog" value="opt2" label="Opción 2" checked></designio-radio-button>
      <designio-radio-button type="bbog" radio-id="g-bbog-3" name="grp-bbog" value="opt3" label="Opción 3" disabled></designio-radio-button>
    </div>
    <script>
      (function(){
        var root=document.getElementById('${gid}');
        if(!root) return;
        root.querySelectorAll('designio-radio-button').forEach(function(el){
          el.addEventListener('radioChange', function(e){ (${action('radioChange')})(e.detail); });
        });
      })();
    </script>
  `;
};
GroupBbogAggregator.parameters = { controls: { disable: true } };