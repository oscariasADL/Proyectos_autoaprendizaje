import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStoriesComponent } from './home-stories.component';
import { HomeFacade } from '../../home.facade';
import { HomeFacadeMock } from '@testing/mocks/facade/home.facade.mock';
import { ModalController } from '@ionic/angular';
import { ModalControllerMock } from '@testing/mocks/services/modal.controller.mock';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { AdlSecureStorageServiceMock } from '@testing/mocks/services/adl-secure-storage.service.mock';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';

describe('HomeStoriesComponent', () => {
  let component: HomeStoriesComponent;
  let fixture: ComponentFixture<HomeStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalPipesModule],
      declarations: [HomeStoriesComponent],
      providers: [
        { provide: HomeFacade, useClass: HomeFacadeMock },
        { provide: ModalController, useClass: ModalControllerMock },
        {
          provide: AdlSecureStorageService,
          useClass: AdlSecureStorageServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeStoriesComponent);
    component = fixture.componentInstance;
    component.stories = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open story modal', (done) => {
    const story = { isOpened: false };
    component.openStory(story).then(() => {
      expect(story.isOpened).toBeTrue();
      done();
    });
  });

  it('should open story opened', (done) => {
    const story = { isOpened: true };
    component.openStory(story).then(() => {
      expect(story.isOpened).toBeTrue();
      done();
    });
  });

  it('should get the id from story', () => {
    expect(component.trackByFn(0, { id: 'mth-space__bavv_stores1' })).toBe(
      'mth-space__bavv_stores1'
    );
  });
});
