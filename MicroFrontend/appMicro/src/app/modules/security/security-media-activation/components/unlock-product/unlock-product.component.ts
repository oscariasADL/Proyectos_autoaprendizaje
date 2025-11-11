import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UNLOCK_PRODUCT_DATA } from '@modules/security/security-media-activation/constants/security-media-activation.constants';
import {
  ActivationProduct,
  ActivationStatusDescription,
  BlockTemporaryStep,
  MediaActivationType,
  SuspiciousTransaction
} from '@modules/security/security-media-activation/entities/security-media.interface';
import { SecurityMediaActivationFacade } from '@modules/security/security-media-activation/security-media-activation.facade';
import {
  ActivateProductSteps,
  MediaStepsData
} from '@modules/security/security-media-activation/store/security-media.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unlock-product',
  templateUrl: './unlock-product.component.html',
  styleUrls: ['./unlock-product.component.sass']
})
export class UnlockProductComponent implements OnInit {
  @Input() product: ActivationProduct;

  @Output()
  continue: EventEmitter<MediaStepsData> = new EventEmitter<MediaStepsData>();

  constructor(private facade: SecurityMediaActivationFacade) {}

  ngOnInit(): void {
    if (this.isPreventiveBlock) {
      this.facade.suspiciousTransaction(this.product);
    }
  }

  get isPreventiveBlock(): boolean {
    return (
      this.product.status.toLowerCase() ===
      ActivationStatusDescription.PREVENTIVE_BLOCK.toLowerCase()
    );
  }

  get unlockData(): { title: string; description?: string; message?: string } {
    return UNLOCK_PRODUCT_DATA[this.product.status];
  }

  public unlockProduct(): void {
    this.continue.emit({
      step: ActivateProductSteps.unlockProduct,
      data: this.product
    });
  }

  public block(): void {
    this.facade.activateProductSetStep(ActivateProductSteps.block);
    this.facade.setMediaActivationType(MediaActivationType.BlockCard);
  }

  get currentDate(): string {
    return this.facade.date$.currentValue();
  }

  get blockTemporaryStep(): typeof BlockTemporaryStep {
    return BlockTemporaryStep;
  }

  get suspiciousTransactionWorking$(): Observable<boolean> {
    return this.facade.suspiciousTransactionWorking$;
  }

  get suspiciousTransaction$(): Observable<SuspiciousTransaction> {
    return this.facade.suspiciousTransaction$;
  }
}
