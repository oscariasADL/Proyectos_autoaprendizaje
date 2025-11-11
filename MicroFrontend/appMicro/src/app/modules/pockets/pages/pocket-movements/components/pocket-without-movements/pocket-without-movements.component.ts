import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pocket-without-movements',
  templateUrl: './pocket-without-movements.component.html',
  styleUrls: ['./pocket-without-movements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PocketWithoutMovementsComponent {}
