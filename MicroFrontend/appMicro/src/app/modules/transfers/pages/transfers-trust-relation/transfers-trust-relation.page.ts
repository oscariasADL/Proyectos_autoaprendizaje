import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '@commons/entities/product/product.interface';
import { AlertService } from '@commons/services/alert.service';
import { InformationService } from '@commons/services/information.service';
import {
  TRANSFERS_TRUST_RELATION_INFO_ALERT,
  TRANSFERS_TRUST_RELATION_REMOVE
} from '@modules/transfers/pages/transfers-trust-relation/constants/transfers-trust-relation.constants';
import { TrustRelationItem } from '@modules/transfers/pages/transfers-trust-relation/entities/transfer-trust-relation.interface';
import { TransfersTrustRelationFacade } from '@modules/transfers/pages/transfers-trust-relation/transfers-trust-relation.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transfers-trust-relation',
  templateUrl: './transfers-trust-relation.page.html',
  styleUrls: ['./transfers-trust-relation.page.sass']
})
export class TransfersTrustRelationPage implements OnInit {
  public product: FormControl = new FormControl<Product>(null);

  constructor(
    private facade: TransfersTrustRelationFacade,
    private informationService: InformationService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    void this.informationService.showPanelIfNecessary(
      TRANSFERS_TRUST_RELATION_INFO_ALERT
    );
  }

  public showInformation(): void {
    void this.informationService.showPanel(TRANSFERS_TRUST_RELATION_INFO_ALERT);
  }

  public fetchTrustRelations(product: Product): void {
    this.facade.fetchTrustRelations(product);
  }

  public removeTrustRelation({ phone }: TrustRelationItem): void {
    this.alertService
      .create(TRANSFERS_TRUST_RELATION_REMOVE)
      .then((confirm) => {
        if (confirm) {
          const { id } = this.product.value as Product;
          this.facade.removeTrustRelation(
            { relativeId: String(id), phone },
            this.product?.value
          );
        }
      });
  }

  get hasValidProducts$(): Observable<boolean> {
    return this.facade.hasValidProducts$;
  }

  get products$(): Observable<Product[]> {
    return this.facade.products$;
  }

  get working$(): Observable<boolean> {
    return this.facade.trustRelationsWorking$;
  }

  get completed$(): Observable<boolean> {
    return this.facade.trustRelationsCompleted$;
  }

  get trustRelations$(): Observable<TrustRelationItem[]> {
    return this.facade.trustRelations$;
  }
}
