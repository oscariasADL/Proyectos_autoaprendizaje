import { Injectable } from '@angular/core';

import {
  OneSpanSecureMessaging,
  ParseBodyTransactionOptions,
  ParseBodyTransactionResponse
} from '@avaldigitallabs/one-span-secure-messaging';

@Injectable({
  providedIn: 'root'
})
export class AdlSecureMessagingService {
  public parseBodyTransaction(
    options: ParseBodyTransactionOptions
  ): Promise<ParseBodyTransactionResponse> {
    return OneSpanSecureMessaging.parseBodyTransaction(options);
  }
}
