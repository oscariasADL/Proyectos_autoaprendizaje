import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { AvalFacade } from '@modules/aval/aval.facade';
import { AvalFacadeMock } from '@testing/mocks/facade/aval.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { TuPlusComponent } from './tu-plus.component';

describe('TuPlusComponent', () => {
  let component: TuPlusComponent;
  let fixture: ComponentFixture<TuPlusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TuPlusComponent, ImageUrlPipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: AvalFacade,
          useClass: AvalFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TuPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call redirectTuplus', () => {
    spyOn(component, 'redirectTuplus').and.returnValue(undefined);
    expect(component.redirectTuplus()).toBeUndefined();
  });

  it('should be call convertValue', () => {
    component.tuplusWorking$.subscribe();
    expect(component.convertValue(1234)).toEqual('1.234');
  });
});
