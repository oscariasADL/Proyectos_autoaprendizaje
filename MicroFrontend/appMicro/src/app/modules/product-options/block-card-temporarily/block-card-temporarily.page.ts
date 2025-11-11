import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { format } from 'date-fns';

import { GenericStepperBase } from '@modules/templates/generic-stepper/generic-stepper.base';
import {
  GenericStepperAction,
  GenericStepperInit
} from '@commons/decorators/generic-stepper.decorator';
import {
  BLOCK_CARD_TEMPORARILY_EXIT_DATA,
  BLOCK_CARD_TEMPORARILY_STEPS,
  BlockCardTemporarilySlide
} from '@modules/product-options/block-card-temporarily/constants/block-card-temporarily.constants';
import { HOME } from '@commons/constants/navigate.constants';
import { mapBlockCardTemporarilySlides } from '@modules/product-options/block-card-temporarily/mappers/block-card-temporarily.mapper';
import { mapBlockCardTemporarilyConfirm } from '@modules/product-options/block-card-temporarily/mappers/block-card-temporarily-confirm.mapper';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import { mapBlockCardTemporarilyPayload } from '@modules/product-options/block-card-temporarily/mappers/block-card-temporarily-payload.mapper';
import { BlockCardTemporarilyConfirmationModalComponent } from '@modules/product-options/block-card-temporarily/components/block-card-temporarily-confirmation-modal/block-card-temporarily-confirmation-modal.component';
import { ModalController } from '@commons/controllers/modal.controller';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-block-card-temporarily',
  templateUrl: './block-card-temporarily.page.html',
  styleUrls: ['./block-card-temporarily.page.sass']
})
@GenericStepperInit(
  {
    initSlide: BlockCardTemporarilySlide.from,
    alternativeSlide: BlockCardTemporarilySlide.from
  },
  {
    backUrl: HOME,
    steps: BLOCK_CARD_TEMPORARILY_STEPS,
    exitData: BLOCK_CARD_TEMPORARILY_EXIT_DATA,
    data: (component: BlockCardTemporarilyPage) =>
      mapBlockCardTemporarilySlides(component.form),
    confirmMapper: mapBlockCardTemporarilyConfirm,
    voucherMapper: () => []
  }
)
export class BlockCardTemporarilyPage
  extends GenericStepperBase
  implements OnInit
{
  protected readonly blockCardTemporarilySlide = BlockCardTemporarilySlide;

  constructor(
    protected injector: Injector,
    private modalCtrl: ModalController,
    private securityMediaActivationFacade: SecurityMediaActivationFacade,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initStepper();
  }

  @GenericStepperAction
  public blockCardTemporarily(): void {
    this.securityMediaActivationFacade.temporaryBlockProductV2(
      mapBlockCardTemporarilyPayload(this.form.value)
    );
  }

  public async unBlockProduct(): Promise<void> {
    const modal = await this.modalCtrl.create({
      id: 'block-card-temporarily-confirmation-modal',
      component: BlockCardTemporarilyConfirmationModalComponent,
      componentProps: {
        confirmationModalContent: {
          icon: 'icons/block-card.svg',
          title: 'BLOCK_CARD_TEMPORARILY.MODAL_UNBLOCK.TITLE',
          description: 'BLOCK_CARD_TEMPORARILY.MODAL_UNBLOCK.DESCRIPTION',
          confirmButtonText:
            'BLOCK_CARD_TEMPORARILY.MODAL_UNBLOCK.CONFIRM_BUTTON_TEXT',
          cancelButtonText:
            'BLOCK_CARD_TEMPORARILY.MODAL_UNBLOCK.CANCEL_BUTTON_TEXT'
        }
      },
      mode: 'md',
      cssClass: 'avv-custom-modal'
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.securityMediaActivationFacade.unlockProductV2(
        this.activationProduct.value
      );
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      activationProduct: [null, Validators.required],
      startDate: [this.currentDate$.currentValue(), Validators.required],
      endDate: [null, Validators.required],
      confirmation: [null]
    });
  }

  get activationProduct(): AbstractControl {
    return this.form.get('activationProduct');
  }

  get productSelectedId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  get currentDate$(): Observable<string> {
    return this.securityMediaActivationFacade.date$.pipe(
      map((date) => format(new Date(date), 'dd/MM/yyyy'))
    );
  }
}
