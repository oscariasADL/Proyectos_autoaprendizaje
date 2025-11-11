import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { ToastPackage, ToastRef, ToastrModule } from 'ngx-toastr';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  const TOAST_MOCK = {
    toastId: 1,
    toastType: 'success',
    afterActivate: jasmine.createSpy('afterActivate'),
    config: { toastClass: 'custom-toast' },
    message: 'test message',
    title: 'test title',
    toastRef: new ToastRef(null),
    triggerAction: jasmine.createSpy('triggerAction')
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [IonicModule, ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [
        {
          provide: ToastPackage,
          useValue: TOAST_MOCK
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to action', () => {
    const ev = new Event('');
    spyOn(ev, 'stopPropagation');
    expect(component.action(ev)).toBeFalse();
    expect(ev.stopPropagation).toHaveBeenCalled();
  });
});
