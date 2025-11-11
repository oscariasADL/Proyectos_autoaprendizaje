import { Component, OnInit } from '@angular/core';
import { HomeFacade } from '../../home.facade';
import { ParameterType } from '@store/state/parameter.state';
import { map, take } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { HomeStoriesViewComponent } from '../home-stories-view/home-stories-view.component';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { SecureKeys } from '@commons/constants/keys.constants';
import { getDBValue } from '@commons/helpers/text.helpers';

@Component({
  selector: 'app-home-stories',
  templateUrl: './home-stories.component.html',
  styleUrls: ['./home-stories.component.sass']
})
export class HomeStoriesComponent implements OnInit {
  public stories: any = [];

  constructor(
    private facade: HomeFacade,
    private modalCtrl: ModalController,
    protected secureStorage: AdlSecureStorageService
  ) {}

  ngOnInit(): void {
    this.getStories();
  }

  public async openStory(story: any): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: HomeStoriesViewComponent,
      componentProps: { story }
    });
    await modal.present();
    await this.markStoryAsOpened(story);
  }

  public trackByFn(index, item) {
    return item.id;
  }

  private async markStoryAsOpened(story: any): Promise<void> {
    if (!story.isOpened) {
      story.isOpened = true;
      const db = await this.secureStorage.getAll();
      const data = getDBValue(db, SecureKeys.stories);
      const storiesOpened = data ? JSON.parse(data) : [];
      storiesOpened.push(story.id);
      await this.secureStorage.put(
        SecureKeys.stories,
        JSON.stringify(storiesOpened),
        true
      );
    }
  }

  private async getStories(): Promise<void> {
    const db = await this.secureStorage.getAll();
    const data = getDBValue(db, SecureKeys.stories);
    const storiesOpened = data ? JSON.parse(data) : [];
    this.facade
      .parameterByKey(ParameterType.storiesCampaignBm)
      .pipe(
        take(1),
        map((campaign) => campaign.stories)
      )
      .subscribe((stories) => {
        this.stories = JSON.parse(JSON.stringify(stories ?? [])).map(
          (story) => {
            if (storiesOpened.includes(story.id)) {
              story.isOpened = true;
            }
            return story;
          }
        );
      });
  }
}
