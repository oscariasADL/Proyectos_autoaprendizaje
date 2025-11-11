import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appDenyAccounts]',
  standalone: true
})
export class DenyAccountsDirective implements OnInit, OnDestroy {
  private values: string[] = [];
  userDocumentType: string;
  userDataSub: Subscription;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private facade: AppFacade
  ) {}

  @Input()
  set appDenyAccounts(values: string[]) {
    this.values = values;
  }

  ngOnInit() {
    this.getValueToCheck();
  }
  ngOnDestroy(): void {
    this.userDataSub.unsubscribe();
  }

  private getValueToCheck() {
    this.userDataSub = this.facade.userData$.subscribe((userData) => {
      if (userData.dataBasicClientDto.documentType) {
        this.userDocumentType = userData.dataBasicClientDto.documentType;
        this.updateView();
      }
    });
  }

  private updateView() {
    const shouldHide =
      Array.isArray(this.values) && this.values.includes(this.userDocumentType);

    this.viewContainer.clear();

    if (!shouldHide) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
