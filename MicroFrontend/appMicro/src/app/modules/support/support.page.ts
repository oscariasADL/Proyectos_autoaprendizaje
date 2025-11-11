import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupportFacade } from './support.facade';
import { ParameterType } from '@app/store/state/parameter.state';
import { debounce, map, startWith, switchMap } from 'rxjs/operators';
import { normalizeText } from '@app/commons/utils/util';
import { FormControl } from '@angular/forms';
import { of, timer } from 'rxjs';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupportPage {
  public searchControl: FormControl<string> = new FormControl();
  public supportData$ = this.facade
    .parameterByKey(ParameterType.helpSitesBm)
    .pipe(
      switchMap((initialData) =>
        this.searchControl.valueChanges.pipe(
          startWith(''),
          debounce((searchTerm) => (searchTerm === '' ? of(0) : timer(300))),
          map((searchTerm) => {
            if (!searchTerm) {
              return initialData;
            }

            const filterData = {};
            const normalizedSearchTerm = normalizeText(searchTerm);
            Object.keys(initialData).forEach((key) => {
              const items = initialData[key].items.filter((item) =>
                normalizeText(item.title).includes(normalizedSearchTerm)
              );
              if (items.length) {
                filterData[key] = { items };
              }
            });
            return filterData;
          })
        )
      )
    );

  public supportDataSpi$ = this.facade
    .parameterByKey(ParameterType.brebFrequentQuestionsBm)
    .pipe(
      switchMap((initialData) =>
        this.searchControl.valueChanges.pipe(
          startWith(''),
          debounce((searchTerm) => (searchTerm === '' ? of(0) : timer(300))),
          map((searchTerm) => {
            if (!searchTerm) {
              return initialData;
            }

            let filterData = {};
            const normalizedSearchTerm = normalizeText(searchTerm);
            const questions = initialData.questions.filter((item) =>
              normalizeText(item.title).includes(normalizedSearchTerm)
            );
            if (questions.length) {
              filterData = { questions };
            }
            return filterData;
          })
        )
      )
    );

  constructor(private facade: SupportFacade) {}

  public openUrl(url: string) {
    this.facade.openExternalLinks(url);
  }
}
