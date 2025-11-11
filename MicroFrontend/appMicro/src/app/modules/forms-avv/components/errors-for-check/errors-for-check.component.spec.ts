import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorsForCheckComponent } from './errors-for-check.component';
import { ShareFacade } from '@commons/components/share/share.facade';
import { ShareFacadeMock } from '@testing/mocks/facade/share.facade.mock';

describe('ErrorsForCheckComponent', () => {
  let component: ErrorsForCheckComponent;
  let fixture: ComponentFixture<ErrorsForCheckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorsForCheckComponent],
      imports: [IonicModule],
      providers: [
        {
          provide: ShareFacade,
          useClass: ShareFacadeMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorsForCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
