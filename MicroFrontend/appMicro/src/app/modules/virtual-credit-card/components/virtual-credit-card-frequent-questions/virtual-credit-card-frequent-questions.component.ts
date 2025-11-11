import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { VirtualCreditCardFacade } from '@modules/virtual-credit-card/virtual-credit-card.facade';
import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { ParameterType } from '@store/state/parameter.state';
import { VirtualCreditCardQuestion } from '@modules/virtual-credit-card/entities/virtual-credit-card.interface';

@Component({
  selector: 'app-virtual-credit-card-frequent-questions',
  templateUrl: './virtual-credit-card-frequent-questions.component.html',
  styleUrls: ['./virtual-credit-card-frequent-questions.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [GlobalPipesModule, CommonModule],
  providers: [VirtualCreditCardFacade]
})
export class VirtualCreditCardFrequentQuestionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subscription: Subscription;
  private questionOpen: number[] = [];
  private aTagElements: NodeListOf<Element>;
  private readonly SELECTOR_ANCHOR: string =
    '.virtual-credit-card-frequent-question-list-content > p > a';

  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    @Inject(DOCUMENT) private _document: Document,
    private facade: VirtualCreditCardFacade
  ) {}

  ngOnInit(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      BackButtonPriorities.second,
      () => {
        void this.modalCtrl.dismiss();
      }
    );
  }

  ngAfterViewInit(): void {
    this.aTagElements = this._document.querySelectorAll(this.SELECTOR_ANCHOR);
    this.aTagElements.forEach((element: HTMLAnchorElement) => {
      element.addEventListener('click', this.handleClickAnchorTag(element));
    });
  }

  ngOnDestroy(): void {
    if (!isNullOrUndefined(this.subscription)) {
      this.subscription.unsubscribe();
    }
    this.aTagElements.forEach((element: HTMLAnchorElement) => {
      element.removeEventListener('click', this.handleClickAnchorTag(element));
    });
  }

  private handleClickAnchorTag(
    element: HTMLAnchorElement
  ): (evt: MouseEvent) => void {
    return (evt: MouseEvent) => {
      evt.preventDefault();
      this.facade.openExternalLinks(element.href);
      this.closeModal();
    };
  }

  public closeModal(): void {
    void this.modalCtrl.dismiss();
  }

  public toggleQuestion(questionIndex: number): void {
    if (this.isOpen(questionIndex)) {
      this.questionOpen = this.questionOpen.filter(
        (value) => value !== questionIndex
      );
    } else {
      this.questionOpen.push(questionIndex);
    }
  }

  public isOpen(questionIndex: number): boolean {
    return this.questionOpen.includes(questionIndex);
  }

  get questions$(): Observable<VirtualCreditCardQuestion[]> {
    return this.facade.parameterByKey(ParameterType.virtualCreditCardQuestions);
  }
}
