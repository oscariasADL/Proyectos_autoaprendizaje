import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomizeResultFailedComponent } from './customize-result-failed.component';

xdescribe('CustomizeResultFailedComponent', () => {
  let component: CustomizeResultFailedComponent;
  let fixture: ComponentFixture<CustomizeResultFailedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizeResultFailedComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizeResultFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
