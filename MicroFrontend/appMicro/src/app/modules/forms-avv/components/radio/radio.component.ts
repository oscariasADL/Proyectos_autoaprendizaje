import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { PFMCategoryType } from '@modules/pfm/entities/pfm.interface';

let $idRadio = 0;

@Component({
  selector: 'avv-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.sass']
})
export class RadioComponent implements OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() items: any[];
  @Input() control: UntypedFormControl;
  @Input() isPFM: boolean = false;

  ngOnInit(): void {
    if (isNullOrUndefined(this.id)) {
      $idRadio = $idRadio + 1;
      this.id = 'radio-' + $idRadio.toString();
    }
  }

  public updateControl(value: string): void {
    const itemSelected = this.items.find(
      (item) => item.value.toString() === value.toString()
    );
    this.control.setValue(itemSelected.value);
    this.control.markAsDirty();
  }

  get pfmCategoryType(): typeof PFMCategoryType {
    return PFMCategoryType;
  }
}
