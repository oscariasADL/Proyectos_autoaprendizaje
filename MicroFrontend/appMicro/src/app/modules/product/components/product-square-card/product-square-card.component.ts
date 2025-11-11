import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@commons/entities/product/product.interface';
import { ProductBodyType } from '@commons/entities/product/balance.interface';

@Component({
  selector: 'app-product-square-card',
  templateUrl: './product-square-card.component.html',
  styleUrls: ['./product-square-card.component.sass']
})
export class ProductSquareCardComponent {
  @Input() product: Product;

  @Output() redirectAction: EventEmitter<void> = new EventEmitter<void>();
  @Output() redirectDetail: EventEmitter<void> = new EventEmitter<void>();

  public productBodyType: typeof ProductBodyType = ProductBodyType;
}
