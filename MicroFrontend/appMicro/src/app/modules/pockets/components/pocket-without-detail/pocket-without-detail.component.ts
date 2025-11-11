import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { GlobalPipesModule } from '@commons/pipes/global-pipes.module';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-pocket-without-detail',
  templateUrl: './pocket-without-detail.component.html',
  styleUrls: ['./pocket-without-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [GlobalPipesModule, UpperCasePipe]
})
export class PocketWithoutDetailComponent {
  @Output() closePocketDetail: EventEmitter<void> = new EventEmitter<void>();

  public close(): void {
    this.closePocketDetail.emit();
  }
}
