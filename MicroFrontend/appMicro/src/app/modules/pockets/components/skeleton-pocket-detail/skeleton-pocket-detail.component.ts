import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-skeleton-pocket-detail',
  templateUrl: './skeleton-pocket-detail.component.html',
  styleUrls: ['./skeleton-pocket-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [IonicModule]
})
export class SkeletonPocketDetailComponent {}
