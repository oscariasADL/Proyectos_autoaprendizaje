import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { TagAvalPopoverComponent } from './tag-aval-popover.component';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('TagAvalPopoverComponent', () => {
  let component: TagAvalPopoverComponent;
  let fixture: ComponentFixture<TagAvalPopoverComponent>;
  let popoverCtrlSpy: jasmine.SpyObj<PopoverController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    popoverCtrlSpy = jasmine.createSpyObj('PopoverController', [
      'create',
      'dismiss'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [TagAvalPopoverComponent],
      imports: [IonicModule, TestingModule],
      providers: [
        { provide: PopoverController, useValue: popoverCtrlSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TagAvalPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call dismiss on closePopover', async () => {
    popoverCtrlSpy.dismiss.and.returnValue(Promise.resolve(true));
    await component.closePopover();
    expect(popoverCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should navigate to the correct URL on redirectToTagAval', () => {
    const tag = 'test-tag';
    component.tag = tag;

    component.redirectToTagAval();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
      `/customize-aval-tag/${tag}`
    );
  });
});
