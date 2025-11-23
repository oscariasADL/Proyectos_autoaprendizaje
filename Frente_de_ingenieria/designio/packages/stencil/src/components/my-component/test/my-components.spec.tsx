import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from '../my-component';

describe('my-component', () => {
  it('debe renderizar con el nombre proporcionado', async () => {
    const page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component name="Gustavo"></my-component>`
    });

    expect(page.root).toEqualHtml(`
      <my-component name="Gustavo">
        <mock:shadow-root>
          <div>Hello, Gustavo!</div>
        </mock:shadow-root>
      </my-component>
    `);
  });

  it('debe renderizar con el valor por defecto "World" si no se pasa name', async () => {
    const page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component></my-component>`
    });

    expect(page.root).toEqualHtml(`
      <my-component>
        <mock:shadow-root>
          <div>Hello, World!</div>
        </mock:shadow-root>
      </my-component>
    `);
  });

  it('coincide con el snapshot', async () => {
    const page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component name="Snapshot"></my-component>`
    });
    expect(page.root).toMatchSnapshot();
  });
});
