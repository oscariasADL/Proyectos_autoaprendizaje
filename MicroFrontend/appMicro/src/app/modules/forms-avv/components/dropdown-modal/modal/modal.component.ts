import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@commons/controllers/modal.controller';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {
  @Input() title: string = 'Selecciona el tipo de producto';
  @Input() list: any = [];
  @Input() highlightedItem: number;
  @Input() resultsVisible: boolean;
  @Input() isTypeRadioButton: boolean = false;

  public radioButtonCtrl: FormControl = new FormControl();

  constructor(private modalCtrl: ModalController) {}

  public onItemSelect(index: number): void {
    this.modalCtrl.dismiss(index, 'selected');
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(null, 'close');
  }
}
