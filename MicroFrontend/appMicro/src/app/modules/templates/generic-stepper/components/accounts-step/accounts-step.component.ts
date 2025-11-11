import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Balance } from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { mapProductsByFilter } from '@modules/product/mappers/product-filter.mapper';
import { AccountsStepFacade } from '@modules/templates/generic-stepper/components/accounts-step/accounts-step.facade';
import {
  GenericStepData,
  StepperExceptions,
  StepperTypes
} from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GenericStepperFacade } from '@modules/templates/generic-stepper/generic-stepper.facade';

@Component({
  selector: 'app-accounts-step',
  templateUrl: './accounts-step.component.html',
  styleUrls: ['./accounts-step.component.sass']
})
export class AccountsStepComponent {
  @Input() data: GenericStepData;
  @Input() utagCategory: string | null = null;

  @Output() nextStep: EventEmitter<string> = new EventEmitter<string>();

  public productStyleType: typeof ProductStyleType = ProductStyleType;
  public readonly products$: Observable<Product[]> = this.facade.balance$.pipe(
    filter((balance) => !!balance),
    map((balance: Balance[]) =>
      mapProductsByFilter(balance, this.data.accountFilters)
    ),
    map((products: Product[]) =>
      products.map((product) =>
        product.type === TypeAccount.DDA
          ? {
              ...product
              // availableBalance: product.availableBalanceWithOverdraft
            }
          : product
      )
    )
  );

  constructor(
    private facade: AccountsStepFacade,
    private genericStepperFacade: GenericStepperFacade
  ) {}

  public selectProduct(product: Product): void {
    if (!this.isDisabled(product)) {
      this.genericStepperFacade.setProductSelected({ product });
      this.data.control.setValue(product);
      this.data.control.markAsDirty();
      this.nextStep.emit();
    }
  }

  public showInformation(): void {
    this.nextStep.emit(StepperTypes.informationPanel);
  }

  public closeStepper(): void {
    this.nextStep.emit(StepperExceptions.closeStepper);
  }

  public isDisabled(product: Product): boolean {
    return (
      !isNullOrUndefined(product) &&
      !isNullOrUndefined(this.data.disabledField) &&
      (product[this.data.disabledField] <= 0 ||
        (!isNullOrUndefined(this.data.validateAmount) &&
          product[this.data.disabledField] < this.data.validateAmount))
    );
  }

  get working$(): Observable<boolean> {
    return this.facade.balanceWorking$;
  }
}
