import { Injectable } from '@angular/core';

@Injectable()
export class LogManagerServiceMock {
  public async log(): Promise<void> {}
}
