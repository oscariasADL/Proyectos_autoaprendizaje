import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { SingleUnregisteredKeyButtonComponent } from './single-unregistered-key-button.component';
import { TestingModule } from '@testing/testing.module';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceMock } from '@app/commons/services/mocks/translateService.mock';
import { SPI_MF } from '@app/commons/constants/navigate.constants';
import { By } from '@angular/platform-browser';

xdescribe('SingleUnregisteredKeyButtonComponent', () => {
  let component: SingleUnregisteredKeyButtonComponent;
  let fixture: ComponentFixture<SingleUnregisteredKeyButtonComponent>;
  let navControllerSpy: jasmine.SpyObj<NavController>;
  beforeEach(waitForAsync(() => {
    navControllerSpy = jasmine.createSpyObj('NavController', [
      'navigateForward'
    ]);
    TestBed.configureTestingModule({
      declarations: [SingleUnregisteredKeyButtonComponent],
      imports: [IonicModule.forRoot(), TestingModule],
      providers: [
        { provide: NavController, useValue: navControllerSpy },
        { provide: TranslateService, useValue: TranslateServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleUnregisteredKeyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Input Properties', () => {
    it('should update avalTag when input changes', () => {
      const newTag = 'NEW_TAG';
      component.avalTag = newTag;
      fixture.detectChanges();

      expect(component.avalTag).toBe(newTag);

      const keySpan = fixture.debugElement.query(By.css('.key'));
      expect(keySpan.nativeElement.textContent.trim()).toBe(newTag);
    });

    it('should handle special characters in avalTag', () => {
      const specialTag = 'TAG-WITH_SPECIAL.CHARS';
      component.avalTag = specialTag;
      component.editTagAval();

      expect(navControllerSpy.navigateForward).toHaveBeenCalledWith(
        `customize-aval-tag/${specialTag}`
      );
    });
  });
});
