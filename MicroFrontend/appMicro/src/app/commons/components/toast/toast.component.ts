import { Component } from '@angular/core';
import { toastAnimations } from '@commons/components/toast/toast.animation';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.sass'],
  animations: toastAnimations,
  preserveWhitespaces: false
})
export class ToastComponent extends Toast {
  public undoString: string = 'undo';

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
  }

  public action(event: Event): boolean {
    event.stopPropagation();
    this.toastPackage.triggerAction();
    return false;
  }
}
