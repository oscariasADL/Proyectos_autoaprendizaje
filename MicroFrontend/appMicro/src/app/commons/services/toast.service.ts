import { Injectable } from '@angular/core';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastRef: any;

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  public create(props: ToastProperties): void {
    this.toastr[props.type](
      this.getText(props.message),
      this.getText(props.title),
      {
        closeButton: true,
        progressBar: true,
        ...props.override
      }
    );
  }

  public clear(): void {
    this.toastr.clear();
  }

  private getText(key: string | null): string {
    return key ? this.translate.instant(key) : null;
  }
}
