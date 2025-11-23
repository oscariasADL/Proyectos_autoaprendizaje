import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true
})
export class MyComponent {
  /**
   * Name
   */
  @Prop() name: string;

  render() {
    return <div>Hello, {this.name || 'World'}!</div>;
  }
}
