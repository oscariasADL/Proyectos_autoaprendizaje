import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdlSecureStorageService } from '@commons/services/adl-secure-storage.service';
import { environment as ENV } from '@environment';

@Component({
  selector: 'app-clear-data',
  templateUrl: './clear-data.component.html',
  styleUrls: ['./clear-data.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClearDataComponent {
  public showClearData: boolean = ENV.clear_data;

  constructor(private secureStorage: AdlSecureStorageService) {}

  public async clearData(): Promise<void> {
    await this.secureStorage.cleanAllDB();
    this.reload();
  }
  public reload(): void {
    location.reload();
  }
}
