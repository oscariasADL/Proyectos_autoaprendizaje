import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { BlockCardTemporarilyDateComponent } from './block-card-temporarily-date.component';
import { TestingModule } from '@testing/testing.module';
import { FranchiseImagePipe } from '@commons/pipes/franchise-image.pipe';
import { ModalController } from '@commons/controllers/modal.controller';
import { FormControl, FormGroup } from '@angular/forms';
import { BlockCardTemporarilyFacade } from '@modules/product-options/block-card-temporarily/block-card-temporarily.facade';

describe('BlockCardTemporarilyDateComponent', () => {
  let component: BlockCardTemporarilyDateComponent;
  let fixture: ComponentFixture<BlockCardTemporarilyDateComponent>;
  let blockCardTemporarilyFacadeStub: Partial<BlockCardTemporarilyFacade>;
  let modalCtrlSpy;
  let modalSpy;

  beforeEach(waitForAsync(() => {
    blockCardTemporarilyFacadeStub = {
      date$: of('2024-11-15T09:58:35')
    };
    modalSpy = jasmine.createSpyObj('Modal', [
      'present',
      'onDidDismiss',
      'onWillDismiss'
    ]);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    TestBed.configureTestingModule({
      declarations: [BlockCardTemporarilyDateComponent, FranchiseImagePipe],
      imports: [IonicModule, TestingModule],
      providers: [
        {
          provide: BlockCardTemporarilyFacade,
          useValue: blockCardTemporarilyFacadeStub
        },
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockCardTemporarilyDateComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup<any>({
      activationProduct: new FormControl({ name: 'Tarjeta Débito' }),
      endDate: new FormControl(null)
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open calendar component', async () => {
    const data = new Date();
    modalSpy.onDidDismiss.and.callFake(async () => ({
      data: data
    }));
    modalCtrlSpy.create.and.callFake(() => {
      return modalSpy;
    });
    await component.openCalendar();
    expect(modalCtrlSpy.create).toHaveBeenCalled();
    expect(modalSpy.onDidDismiss).toHaveBeenCalled();
    spyOn(component.endDateControl, 'setValue');
    expect(component.endDateControl.value).toEqual(data);
  });

  it('should be currentDate defined', () => {
    expect(component.currentDate).toBeDefined();
  });

  it('should be endDateControl defined', () => {
    expect(component.endDateControl).toBeDefined();
  });

  it('should be activationProductControl defined', () => {
    expect(component.activationProductControl).toBeDefined();
  });
});
