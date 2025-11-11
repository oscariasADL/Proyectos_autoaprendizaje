import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { DomSanitizer, SafeHtml, SafeValue } from '@angular/platform-browser';
import { ImageSvgComponent } from './image-svg.component';
import { environment as ENV } from '@environment';
import { SecurityContext } from '@angular/core';

class DomSanitizerStub {
  public bypassSecurityTrustHtml(value: string): SafeHtml {
    return `Sanitized: ${value}`;
  }

  public sanitize(
    context: SecurityContext,
    value: SafeValue | string | null
  ): string | null {
    return value.toString();
  }
}

describe('ImageSvgComponent', () => {
  let component: ImageSvgComponent;
  let fixture: ComponentFixture<ImageSvgComponent>;
  let httpMock: HttpTestingController;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageSvgComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: DomSanitizer, useClass: DomSanitizerStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageSvgComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
