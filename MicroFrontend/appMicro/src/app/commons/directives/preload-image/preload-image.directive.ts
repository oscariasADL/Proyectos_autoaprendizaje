import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appPreloadImage]',
  standalone: true
})
export class PreloadImageDirective implements OnInit {
  @Input() preload: any = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
  }

  @HostListener('load') onLoad() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
    this.preload.el.style.display = 'none';
  }
}
