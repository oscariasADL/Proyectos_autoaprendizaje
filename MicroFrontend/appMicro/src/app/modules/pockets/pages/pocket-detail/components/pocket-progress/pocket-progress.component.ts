import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

const CIRCUMFERENCE = 440.292;

@Component({
  selector: 'app-pocket-progress',
  templateUrl: './pocket-progress.component.html',
  styleUrls: ['./pocket-progress.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PocketProgressComponent implements OnChanges {
  @Input() icon: string;
  @Input() progress: string;

  public circumference: number = CIRCUMFERENCE;
  public fill: number = CIRCUMFERENCE;

  constructor(protected cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.fill =
        this.circumference * ((100 - parseInt(this.progress, 10)) / 100);
      this.cdRef.detectChanges();
    }, 200);
  }
}
