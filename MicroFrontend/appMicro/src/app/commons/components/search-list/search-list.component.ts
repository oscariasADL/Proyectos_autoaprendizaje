import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { removeSubscriptions } from '@commons/utils/util';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { SearchListItem } from './entities/search-list.entities';

const MINLENGTH_SEARCH = 3;

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.sass']
})
export class SearchListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() working: boolean;
  @Input() inputLabel: string;
  @Input() searchList: SearchListItem[] = [];
  @Input() showSearchLength: number = 5;
  @Input() showError: string = null;
  @Input() notFoundText: string;

  @Output()
  selectItem: EventEmitter<SearchListItem> = new EventEmitter<SearchListItem>();

  public searchControl: UntypedFormControl;
  public listFilter: SearchListItem[] = [];

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.initForm();
    this.subscriptions.push(this.setListFilter());
  }

  ngOnDestroy(): void {
    removeSubscriptions(this.subscriptions);
  }

  ngOnChanges({ searchList }: SimpleChanges): void {
    if (searchList.previousValue?.length !== searchList.currentValue.length) {
      this.listFilter = this.searchList;
    }
  }

  private initForm(): void {
    this.searchControl = new UntypedFormControl('', [
      Validators.maxLength(8164)
    ]);
  }

  private setListFilter(): Subscription {
    return this.searchControl.valueChanges
      .pipe(
        map((text) => text?.trim()),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
  }

  public search(text: string): void {
    if (!!text && text.length >= MINLENGTH_SEARCH) {
      this.listFilter = this.searchList
        ? this.searchList.filter(
            (item) =>
              item.title.toLowerCase().includes(text.toLowerCase()) ||
              (!!item.subtitle &&
                item.subtitle.toLowerCase().includes(text.toLowerCase()))
          )
        : [];
    } else if (text.length === 0) {
      this.listFilter = this.searchList;
    }
  }
}
