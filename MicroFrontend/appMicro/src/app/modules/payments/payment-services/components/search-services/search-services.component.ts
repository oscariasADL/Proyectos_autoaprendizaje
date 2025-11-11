import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ServiceData } from '../../entities/register-service.interface';
import { PaymentServicesFacade } from '../../payment-services.facade';

const MINLENGTH_SEARCH = 3;

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.sass']
})
export class SearchServicesComponent implements OnInit, OnDestroy {
  public searchControl: UntypedFormControl;
  public workingSubscription: Subscription;
  public working: boolean;

  @Output()
  selectCategory: EventEmitter<ServiceData> = new EventEmitter<ServiceData>();

  constructor(private facade: PaymentServicesFacade) {}

  ngOnInit(): void {
    this.initForm();
    this.workingSubscription = this.facade.searchWorkingCategory$.subscribe(
      (loading) => (this.working = loading)
    );
  }

  ngOnDestroy(): void {
    this.working = false;
    this.workingSubscription.unsubscribe();
  }

  private initForm(): void {
    this.searchControl = new UntypedFormControl(null, [
      Validators.required,
      Validators.maxLength(8164)
    ]);
  }

  public search(text: string): void {
    if (!!text && text.length >= MINLENGTH_SEARCH && !this.working) {
      this.facade.searchCategory(text);
    }
  }

  get list$(): Observable<ServiceData[]> {
    return this.facade.categorylist$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.searchCompletedCategory$;
  }

  get MINLENGTH_SEARCH(): number {
    return MINLENGTH_SEARCH;
  }
}
