import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  Contact,
  StatusType
} from '@modules/contacts/entities/contact.interface';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactBookComponent implements OnInit {
  @Input() filter: string;
  @Input() contacts: Contact[];
  @Input() showSearch: boolean = true;
  @Input() working: boolean;
  @Input() fieldToNickname: string = null;
  @Input() hideList: boolean = false;

  @Output() setFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() clicked: EventEmitter<Contact> = new EventEmitter<Contact>();

  public searchControl: UntypedFormControl = new UntypedFormControl();

  ngOnInit(): void {
    this.listenSearch();
  }

  private listenSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        map((text) => text?.trim()),
        distinctUntilChanged()
      )
      .subscribe((text) => this.setFilter.emit(text));
  }

  get visualControlContacts(): boolean {
    return (
      (this.contacts &&
        this.contacts.length === 1 &&
        this.contacts[0]?.isFake) ||
      false
    );
  }

  public onContactClick(contact: Contact): void {
    if (contact.status === StatusType.ACTIVE || contact?.isFake) {
      this.clicked.emit(contact);
    }
  }
}
