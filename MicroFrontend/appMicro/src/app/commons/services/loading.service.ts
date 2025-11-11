import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private componentRef: any;
  private loading: boolean = false;

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  public enableLoading(): void {
    if (!this.loading) {
      this.componentRef = this.appendComponentToBody(LoadingComponent);
      this.loading = true;
    }
  }

  public disableLoading(): void {
    if (!isNullOrUndefined(this.componentRef)) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.loading = false;
    }
  }

  private appendComponentToBody(component: any): any {
    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    componentRef.changeDetectorRef.detectChanges();

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    // 5. Wait some time and remove it from the component tree and from the DOM
    // setTimeout(() => {
    //     this.appRef.detachView(componentRef.hostView);
    //     componentRef.destroy();
    // }, 3000);
    return componentRef;
  }
}
