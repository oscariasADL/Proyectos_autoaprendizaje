import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PocketCreateDescriptionProfitabilityComponent } from './pocket-create-description-profitability.component';
import { TestingModule } from '@testing/testing.module';
import { ModalController } from '@commons/controllers/modal.controller';
import { PocketsFacade } from '@modules/pockets/pockets.facade';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { OPEN_EXTERNAL_URL_ALERT } from '@commons/constants/global.constants';

describe('PocketCreateDescriptionProfitabilityComponent', () => {
  let component: PocketCreateDescriptionProfitabilityComponent;
  let fixture: ComponentFixture<PocketCreateDescriptionProfitabilityComponent>;
  const modalCtrlSpy = jasmine.createSpyObj<ModalController>(['dismiss']);
  let pocketFacadeStub: Partial<PocketsFacade>;

  beforeEach(waitForAsync(() => {
    pocketFacadeStub = {
      openExternalLinks(
        url: string,
        target: '_self' | '_blank' = '_blank',
        alertProps: AlertSheetProperties = OPEN_EXTERNAL_URL_ALERT
      ) {
        return;
      }
    };
    TestBed.overrideComponent(PocketCreateDescriptionProfitabilityComponent, {
      add: {
        imports: [TestingModule],
        providers: [
          { provide: ModalController, useValue: modalCtrlSpy },
          {
            provide: PocketsFacade,
            useValue: pocketFacadeStub
          }
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(
      PocketCreateDescriptionProfitabilityComponent
    );
    component = fixture.componentInstance;
    component.buttonActionText = 'ACTIONS.CONTINUE';
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call be closeModal', () => {
    component.closeModal();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalled();
  });

  it('should call to openLink', () => {
    spyOn(pocketFacadeStub, 'openExternalLinks').and.callFake(() => {
      return;
    });
    component.openLink();
    expect(pocketFacadeStub.openExternalLinks).toHaveBeenCalled();
  });
});
