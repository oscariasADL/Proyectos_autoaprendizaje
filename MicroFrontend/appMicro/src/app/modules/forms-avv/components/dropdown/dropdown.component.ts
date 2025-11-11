import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

let $id = 0;

@Component({
  selector: 'avv-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass']
})
export class DropdownComponent implements OnInit, AfterViewInit {
  @ViewChild('avvDropdown', { static: false }) avvDropdown: ElementRef;

  @Input() id: string;
  @Input() label: string;
  @Input() control: UntypedFormControl;
  @Input() disabled: boolean;
  @Input() loading: boolean = false;
  @Input() template: TemplateRef<any>;
  @Input() isSmall: boolean = false;
  @Input() hint: string = '';

  @Output() valueOutput: any = new EventEmitter<any>();

  private currentItem: number = 0;
  private isFocused: boolean = false;
  private isAvailable: boolean = false;

  list: any[];
  _items: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  @HostListener('document:click', ['$event'])
  public clickOut(event: any): void {
    if (this.isAvailable) {
      const flyoutElement = this.avvDropdown.nativeElement;
      let targetElement = event.target; // clicked element

      do {
        if (targetElement === flyoutElement) {
          // This is a click inside. Do nothing, just return.
          return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
      } while (targetElement);

      // This is a click outside
      this.blur();
    }
  }

  ngOnInit(): void {
    this.initId();
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.isAvailable = true), 200);
  }

  @Input()
  set items(list: any[]) {
    this.list = list;
    this._items = list;
  }

  get inputValue(): string {
    const item = this.control.value;
    return item && item.label ? item.label : this.control.value ? ' ' : '';
  }

  get resultsVisible(): boolean {
    return this.isFocused;
  }

  get highlightedItem(): number {
    return this.currentItem;
  }

  public focus(): void {
    if (!this.disabled && !this.loading) {
      this.isFocused = true;
      this.avvDropdown.nativeElement.focus();
    }
  }

  public blur(): void {
    this.isFocused = false;
    this.control.markAsTouched();
    this.avvDropdown.nativeElement.blur();
    this.avvDropdown.nativeElement.children[0].children[0].blur();
    this.cdRef.detectChanges();
  }

  public touchEnd(): void {
    if (!this.disabled && !this.loading) {
      if (this.isFocused) {
        setTimeout(() => this.blur(), 100);
      } else {
        this.isFocused = true;
        this.avvDropdown.nativeElement.focus();
      }
    }
  }

  public onItemSelect(index: number): void {
    this.control.setValue(this.list[index]);
    this.control.markAsDirty();
    this.valueOutput.emit(this.control.value);
    this.onItemHover(index);
    this.blur();
  }

  public onItemHover(index: number): void {
    this.currentItem = index;
  }

  public onEnterKey(index: number): void {
    if (this.isFocused) {
      this.onItemSelect(index);
    } else {
      this.focus();
    }
  }

  public highlightNext(event: KeyboardEvent): void {
    event.preventDefault();
    this.currentItem =
      this.currentItem + 1 < this.list.length
        ? this.currentItem + 1
        : this.currentItem;
  }

  public highlightPrevious(event: KeyboardEvent): void {
    event.preventDefault();
    this.currentItem =
      this.currentItem > 0 ? this.currentItem - 1 : this.currentItem;
  }

  private initId(): void {
    if (isNullOrUndefined(this.id)) {
      $id = $id + 1;
      this.id = 'avv-dropdown-' + $id.toString();
    }

    if (!!this.control.value && this.control.value.hasOwnProperty('label')) {
      this.currentItem = this.list
        .map((item) => item.label)
        .indexOf(this.control.value.label.toString());
    }
  }

  public setIsFocused(value: boolean): void {
    this.isFocused = value;
  }
}
