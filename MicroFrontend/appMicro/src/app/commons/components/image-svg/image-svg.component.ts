import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SecurityContext
} from '@angular/core';
import { environment as ENV } from '@environment';

/**
 * @deprecated Do not use this component. It only works using bypassSecurityTrustHtml, but it will be reported as a security risk in Sonar.
 */
@Component({
  selector: 'app-image-svg',
  template: '<div [class]="classSvg" [innerHTML]="trustedSvgContent"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSvgComponent implements OnInit {
  @Input() nameSvg: string;
  @Input() classSvg: string;

  public svgContent: string;
  public trustedSvgContent: SafeHtml;

  private baseImg = ENV.resources.base_img;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadSvg();
  }

  public loadSvg(): void {
    this.http
      .get(`${this.baseImg}${this.nameSvg}`, { responseType: 'text' })
      .subscribe((svgData) => {
        this.svgContent = svgData;
        this.trustedSvgContent = this.sanitizer.sanitize(
          SecurityContext.HTML,
          this.trustedSvgContent
        );
        this.cdRef.detectChanges();
      });
  }
}
