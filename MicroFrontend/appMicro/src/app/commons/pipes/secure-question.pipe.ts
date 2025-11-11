import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'secureQuestion'
})
export class SecureQuestionPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(question: string | number): string | number {
    return parseFloat(question.toString()) > 0 &&
      parseFloat(question.toString()) <= 3
      ? this.translate.instant(
          'AUTH.STEP.FILL_SECURE_DATA.QUESTIONS.' + question
        )
      : question;
  }
}
