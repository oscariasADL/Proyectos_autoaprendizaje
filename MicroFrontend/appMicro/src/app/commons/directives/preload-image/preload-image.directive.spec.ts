import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { PreloadImageDirective } from './preload-image.directive';
import { TestBed } from '@angular/core/testing';

describe('PreloadImageDirective', () => {
  let directive: PreloadImageDirective;
  let elementRef: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    elementRef = new ElementRef<HTMLInputElement>(
      document.createElement('input')
    );
    const rendererFactory2 = TestBed.inject(RendererFactory2);
    renderer = rendererFactory2.createRenderer(null, null);
    directive = new PreloadImageDirective(elementRef, renderer);
    directive.preload = { el: document.createElement('div') };
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should change elements style', () => {
    spyOn(renderer, 'setStyle');
    directive.onLoad();
    expect(directive.preload.el.style.display).toBe('none');
  });
});
