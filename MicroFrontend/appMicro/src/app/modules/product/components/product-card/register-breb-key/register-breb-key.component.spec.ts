import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterBrebKeyComponent } from './register-breb-key.component';
import { TestingModule } from '@testing/testing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterBrebKeyComponent', () => {
  let component: RegisterBrebKeyComponent;
  let fixture: ComponentFixture<RegisterBrebKeyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBrebKeyComponent],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterBrebKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit goToLink ', () => {
    spyOn(component.goToLink, 'emit');
    component.onGoToLink();
    expect(component.goToLink.emit).toHaveBeenCalled();
  });

  it('should return bre-b.svg', () => {
    expect(component.getIcon()).toBe('assets/img/aval-icons/bre-b.svg');
  });

  it('should emit showTagAvalPopover event when onShowTagAvalPopover is called', () => {
    spyOn(component.showTagAvalPopover, 'emit');
    const mockEvent = new MouseEvent('click');

    component.onShowTagAvalPopover(mockEvent);

    expect(component.showTagAvalPopover.emit).toHaveBeenCalledWith(mockEvent);
  });
});
