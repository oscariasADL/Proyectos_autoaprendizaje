import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';
import { LinkKey } from '@commons/entities/parameters/links.entities';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { TermsDetailComponent } from '@modules/auth/auth-steps/components/terms-detail/terms-detail.component';

@Component({
  selector: 'app-toggle-terms',
  templateUrl: './toggle-terms.component.html',
  styleUrls: ['./toggle-terms.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleTermsComponent {
  @Input() control: UntypedFormControl;

  public acceptTerms: boolean = false;
  public authorizeTerms: boolean = false;

  constructor(
    private facade: AuthStepsFacade,
    private modalCtrl: ModalController
  ) {}

  public toggleAcceptTerms(): void {
    this.acceptTerms = !this.acceptTerms;
    this.toggleTerms();
  }

  public toggleAuthorizeTerms(): void {
    this.authorizeTerms = !this.authorizeTerms;
    this.toggleTerms();
  }

  private toggleTerms(): void {
    this.control.setValue(this.acceptTerms && this.authorizeTerms);
  }

  public async showTermsDetail(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TermsDetailComponent,
      componentProps: { id: 'terms-detail-alert-modal' },
      mode: 'md',
      cssClass: 'avv-custom-full-modal'
    });
    await modal.present();
  }

  get linkTermsOfUse(): string {
    return this.facade.linkByKey(LinkKey.linkTermsOfUse);
  }
}
