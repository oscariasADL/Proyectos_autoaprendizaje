import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FAVORITY_PHONE_PATH } from '../../constants/favorites.contants';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { PreloadImageDirective } from '@app/commons/directives/preload-image/preload-image.directive';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-favorite-card',
  templateUrl: './add-favorite-card.component.html',
  styleUrls: ['./add-favorite-card.component.sass'],
  standalone: true,
  imports: [IonicModule, GlobalPipesModule, PreloadImageDirective]
})
export class AddFavoriteCardComponent {
  @Output() cardClicked: EventEmitter<void> = new EventEmitter<void>();

  public readonly favoritePhonePath = FAVORITY_PHONE_PATH;

  public onClick(): void {
    this.cardClicked.emit();
  }
}
