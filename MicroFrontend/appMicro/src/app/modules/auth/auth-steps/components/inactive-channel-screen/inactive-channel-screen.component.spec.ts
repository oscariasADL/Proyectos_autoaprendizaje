import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { IonicModule } from '@ionic/angular';
import { AuthStepsFacade } from '@modules/auth/auth-steps/auth-steps.facade';
import { AuthStepsFacadeMock } from '@testing/mocks/facade/auth-steps.facade.mock';
import { TestingModule } from '@testing/testing.module';

import { InactiveChannelScreenComponent } from './inactive-channel-screen.component';

describe('InactiveChannelScreenComponent', () => {
  let component: InactiveChannelScreenComponent;
  let fixture: ComponentFixture<InactiveChannelScreenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InactiveChannelScreenComponent, ImageUrlPipe],
      imports: [IonicModule, ReactiveFormsModule, TestingModule],
      providers: [
        {
          provide: AuthStepsFacade,
          useClass: AuthStepsFacadeMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                data: {
                  data: { title: '' },
                  method: () => {
                    return;
                  }
                }
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InactiveChannelScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component.redirectLink).toBeDefined();
    expect(component.title).toBeUndefined();
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component.run(true)).toBeUndefined();
  });
});
