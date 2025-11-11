import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TagComponent } from './tag.component';
import { IonicModule } from '@ionic/angular';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(TagComponent, {
      add: {
        imports: [IonicModule]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit status when onClick() is called', () => {
    const statusSpy = spyOn(component.status, 'emit');

    component.onClick();
    expect(statusSpy).toHaveBeenCalled();
  });
});
