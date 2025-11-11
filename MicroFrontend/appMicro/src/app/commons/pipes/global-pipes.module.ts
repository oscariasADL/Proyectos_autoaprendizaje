import { CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SplitPipe } from '@commons/pipes/split.pipe';
import { CreditCardDateFormatPipe } from '@commons/pipes/credit-card-date-format.pipe';
import { CreditCardNumberFormatPipe } from '@commons/pipes/credit-card-number-format.pipe';
import { FirstWordPipe } from '@commons/pipes/first-word.pipe';
import { HighlightPipe } from '@commons/pipes/highlight.pipe';
import { ReverseDashCasePipe } from '@commons/pipes/reverse-dash-case.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CapitalizePipe } from './capitalize.pipe';
import { CurrencyFormatPipe } from './currency-format.pipe';
import { FranchiseImagePipe } from './franchise-image.pipe';
import { ImageUrlPipe } from './image-url.pipe';
import { LastWordPipe } from './last-word.pipe';
import { MailboxDatePipe } from './mailbox-date.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SecureQuestionPipe } from './secure-question.pipe';
import { TranslatePipe } from './translate.pipe';
import { FirstLettersWordsPipe } from '@commons/pipes/first-letters-words.pipe';
import { NumberFormatPipe } from './number-format.pipe';
import { StripTagsPipe } from './strip-tags.pipe';
import { MonthAbbreviationPipe } from './month-abbreviation.pipe';
import { ImageUrlAltPipe } from './image-url-alt.pipe';
import { ProductNumberMaskPipe } from './product-number-mask.pipe';
import { IsoTimeFormatPipe } from './iso-time-format.pipe';

@NgModule({
  declarations: [
    TranslatePipe,
    SafeHtmlPipe,
    ImageUrlPipe,
    ImageUrlAltPipe,
    CurrencyFormatPipe,
    CapitalizePipe,
    FranchiseImagePipe,
    LastWordPipe,
    SplitPipe,
    FirstWordPipe,
    HighlightPipe,
    MailboxDatePipe,
    ReverseDashCasePipe,
    CreditCardNumberFormatPipe,
    CreditCardDateFormatPipe,
    SecureQuestionPipe,
    FirstLettersWordsPipe,
    NumberFormatPipe,
    StripTagsPipe,
    MonthAbbreviationPipe,
    ProductNumberMaskPipe,
    IsoTimeFormatPipe
  ],
  exports: [
    TranslatePipe,
    SafeHtmlPipe,
    ImageUrlPipe,
    ImageUrlAltPipe,
    CurrencyFormatPipe,
    CapitalizePipe,
    FranchiseImagePipe,
    LastWordPipe,
    SplitPipe,
    FirstWordPipe,
    HighlightPipe,
    MailboxDatePipe,
    IsoTimeFormatPipe,
    ReverseDashCasePipe,
    CreditCardNumberFormatPipe,
    CreditCardDateFormatPipe,
    SecureQuestionPipe,
    FirstLettersWordsPipe,
    NumberFormatPipe,
    StripTagsPipe,
    MonthAbbreviationPipe,
    ProductNumberMaskPipe
  ],
  providers: [
    SafeHtmlPipe,
    ImageUrlPipe,
    ImageUrlAltPipe,
    CurrencyFormatPipe,
    CapitalizePipe,
    FranchiseImagePipe,
    LastWordPipe,
    SplitPipe,
    FirstWordPipe,
    HighlightPipe,
    CurrencyPipe,
    ReverseDashCasePipe,
    CreditCardNumberFormatPipe,
    CreditCardDateFormatPipe,
    SecureQuestionPipe,
    FirstLettersWordsPipe,
    NumberFormatPipe,
    MailboxDatePipe,
    StripTagsPipe
  ],
  imports: [TranslateModule]
})
export class GlobalPipesModule {}
