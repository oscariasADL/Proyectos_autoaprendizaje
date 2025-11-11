import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode
} from '@angular/common/http';
import { environment as ENV } from '@environment';
import { HttpStatus } from '@commons/constants/http.constants';
import { LogManagerService } from '@app/commons/services/log-manager-service/log-manager-service.service';
import { LogSeverity } from '@app/commons/services/log-manager-service/entities/log-manager-service.interface';
import { DataBasicClientDto } from '@app/commons/entities/auth/auth.entities';
import { getDBValue } from '@app/commons/helpers/text.helpers';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import { OneSpanStorageItem } from '@avaldigitallabs/one-span-secure-storage';
import { STORM_EXEMPT_URLS } from '@commons/constants/authorized-urls.constants';

export function validateApprovalId(response: HttpResponse<any>) {
  if ([HttpStatusCode.Ok, HttpStatusCode.Created].includes(response.status)) {
    const urlObj = new URL(response.url);
    const URLS_WITH_APPROVAL_ID_MAPPED = URLS_WITH_APPROVAL_ID.map((url) =>
      ENV.encrypt && !STORM_EXEMPT_URLS.includes(url) ? `/storm${url}` : url
    );
    if (
      URLS_WITH_APPROVAL_ID_MAPPED.some(
        (urlMapped) => urlMapped === urlObj.pathname
      )
    ) {
      if (!response?.body?.approvalId)
        throw new HttpErrorResponse({
          status: HttpStatus.BadRequest,
          error: {
            code: response?.body?.code || 0,
            description:
              response?.body?.description ||
              'La transacción no pudo completarse, por favor intenta nuevamente'
          }
        });
    }
  }
}

const URLS_WITH_APPROVAL_ID: string[] = [
  ENV.api.services.management.cdt_renewal,
  ENV.api.services.base.block_account,
  ENV.api.services.transactions.use_quota,
  ENV.api.services.transactions.card_advance,
  ENV.api.services.transactions.transfiya_request,
  ENV.api.services.transactions.transfers.avvPhone,
  ENV.api.services.pocket.create,
  ENV.api.services.pocket.transfer,
  ENV.api.services.payments.directed_payment,
  ENV.api.services.bills.create_scheduling,
  ENV.api.services.transfiya.consignments_allow,
  ENV.api.services.transfiya.authorize_transfer,
  ENV.api.services.transfiya.default_account_delete,
  ENV.api.services.qr.payment,
  ENV.api.services.qr.payment_dale,
  ENV.api.services.base.cancel_account,
  ENV.api.services.management.cdt_cancel,
  ENV.api.services.payments.loans_pay,
  ENV.api.services.payments.mobile_recharge,
  ENV.api.services.payments.debt_purchase,
  ENV.api.services.bills.services_pay_unregistered,
  ENV.api.services.bills.services_pay,
  ENV.api.services.taxes.tax_payment,
  ENV.api.services.transactions.withdraw,
  ENV.api.services.transactions.transfers.own,
  ENV.api.services.transactions.transfers.contacts,
  ENV.api.services.transactions.transfers.avvCel2cel,
  ENV.api.services.transactions.transfers.contacts,
  ENV.api.services.transactions.transfers.own,
  ENV.api.services.transactions.transfers.fast,
  ENV.api.services.transactions.withdraw,
  ENV.api.services.payments.directed_payment_multiple,
  ENV.api.services.payments.update_installments
];

export const logInterceptorEvent = (
  logManagerService: LogManagerService,
  severity: LogSeverity,
  db: OneSpanStorageItem[],
  customMessage: string,
  error?: any
) => {
  const basicData = getDBValue(db, SecureKeys.basicData);
  const userData: DataBasicClientDto = basicData && JSON.parse(basicData);

  logManagerService
    .log({
      severity,
      fileName: 'bavv-mb-interceptor.ts',
      functionName: 'mapResponse',
      customMessage: `${customMessage} [IP]: ${userData?.ip}`,
      userId: `${userData?.documentNumber}`,
      error
    })
    .catch((err) => {
      console.error('Error logging:', err);
    });
};
