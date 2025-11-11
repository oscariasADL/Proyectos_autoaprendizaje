import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(ToggleComponent, {
      set: {
        template: '<div></div>'
      }
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleChange when toggle() is called', () => {
    const toggleChangeSpy = spyOn(component.toggleChange, 'emit');

    component.toggle();
    expect(toggleChangeSpy).toHaveBeenCalled();
  });
  it('should not emit toggleChange when toggle is disabled called', () => {
    const toggleChangeSpy = spyOn(component.toggleChange, 'emit');
    component.isDisabled = true;
    component.toggle();
    expect(toggleChangeSpy).not.toHaveBeenCalled();
  });
});
