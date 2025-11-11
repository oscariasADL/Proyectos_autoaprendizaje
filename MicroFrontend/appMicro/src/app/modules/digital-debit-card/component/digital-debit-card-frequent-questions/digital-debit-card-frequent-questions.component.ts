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
import { Subscription, Observable } from 'rxjs';

import { ModalController } from '@commons/controllers/modal.controller';
import { BackButtonPriorities } from '@commons/entities/native/platform.interface';
import { DigitalDebitCardQuestion } from '@modules/digital-debit-card/constants/digital-debit-card.constants';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { DigitalDebitCardFacade } from '@modules/digital-debit-card/digital-debit-card.facade';
import { ParameterType } from '@store/state/parameter.state';

@Component({
  selector: 'app-digital-debit-card-frequent-questions',
  templateUrl: './digital-debit-card-frequent-questions.component.html',
  styleUrls: ['./digital-debit-card-frequent-questions.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [GlobalPipesModule, CommonModule],
  providers: [DigitalDebitCardFacade]
})
export class DigitalDebitCardFrequentQuestionsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private subscription: Subscription;
  private questionOpen: number[] = [];
  private aTagElements: NodeListOf<Element>;
  private readonly SELECTOR_ANCHOR: string =
    '.digital-debit-card-frequent-question-list-content > p > a';

  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    @Inject(DOCUMENT) private _document: Document,
    private facade: DigitalDebitCardFacade
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
    if (this.subscription) {
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

  get questions$(): Observable<DigitalDebitCardQuestion[]> {
    return this.facade.parameterByKey(ParameterType.digitalDebitCardQuestions);
  }
}
