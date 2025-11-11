import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppFacade } from '@app/app.facade';
import {
  ALERT_COMPLEMENTARY_SERVICE_ERROR,
  ALERT_COMPLEMENTARY_SERVICE_FAILURE_ERROR,
  ALERT_URL_OFF_ERROR
} from '@commons/constants/permission.constants';
import {
  isNullOrUndefined,
  isNullOrUndefinedOrEmpty
} from '@commons/helpers/text.helpers';
import { AlertService } from '@commons/services/alert.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  /*public restringUrls: string[] = [];

  private restringIds: string[] = [];
  private hiddenIds: string[] = [];
  private permissions: Permission[];*/

  constructor(
    private router: Router,
    private facade: AppFacade,
    private alertService: AlertService
  ) {}

  public listenFeatureEvents(): void {
    this.listenRouterEvents();
    this.listenClickEvents();
  }

  public listenClickEvents(): void {
    const SEARCH_DEPTH = 5;

    document.addEventListener(
      'click',
      (e) => {
        const data = this.facade.featureToggleData$.currentValue();

        let id = (e.target as any).id;
        let element = e.target as any;

        for (let i = 0; i < SEARCH_DEPTH; i++) {
          id = element.id;
          if (isNullOrUndefinedOrEmpty(id)) {
            element = element.parentNode;
          } else {
            i = SEARCH_DEPTH;
          }
        }

        let alert;

        data.buttons.forEach((identifier) => {
          if (id === identifier) {
            e.stopPropagation();

            const complementaryServicesError =
              this.facade.complementaryServicesError$.currentValue();

            alert = complementaryServicesError
              ? ALERT_COMPLEMENTARY_SERVICE_FAILURE_ERROR
              : ALERT_COMPLEMENTARY_SERVICE_ERROR;
          }
        });

        if (isNullOrUndefined(alert)) {
          data.buttonsOff.forEach((identifier) => {
            if (id === identifier) {
              e.stopPropagation();
              alert = ALERT_URL_OFF_ERROR;
            }
          });
        }

        if (!isNullOrUndefined(alert)) {
          this.alertService.create(alert);
        }
      },
      true
    );
  }

  public listenRouterEvents(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.checkPermissions());
  }

  public checkPermissions(): void {
    /*const data = this.facade.featureToggleData$.currentValue();

    this.restringIds.forEach((id) => {
      const element: any = document.getElementById(id);
      if (!isNullOrUndefined(element)) {
        element.disabled = true;
        if (VALID_HTML_TAGS.includes(element.tagName.toLowerCase())) {
          element.style.opacity = '0.5';
        } else {
          element.children[0].style.opacity = '0.5';
        }
      }
    });*/
    /*this.hiddenIds.forEach((id) => {
      const element: any = document.getElementById(id);
      if (!isNullOrUndefined(element)) {
        if (VALID_HTML_TAGS.includes(element.tagName.toLowerCase())) {
          element.classList.add('display-none');
        } else {
          element.children[0].classList.add('display-none');
        }
      }
    });*/
  } /*

  public fetchPermissions(): Observable<Permission[]> {
    const url = ENV.api.services.features;
    return this.http.get<{ featureToggles: Permission[] }>(url).pipe(
      map((data: { featureToggles: Permission[] }) => data.featureToggles),
      tap(() => this.cleanPermissions()),
      tap((permissions: Permission[]) => this.mapPermissions(permissions)),
      tap(() => this.checkPermissions())
    );
  }

  private mapPermissions(permissions: Permission[]): void {
    this.permissions = permissions;

    this.permissions
      .filter((item) => !item.enabled)
      .map((item) => item.name)
      .forEach((itemId) => this.findAndPush(itemId));
  }

  private findAndPush(id: string): void {
    const itemFound = RESTRING_FEATURES.find((feature) => feature.id === id);
    if (!isNullOrUndefined(itemFound)) {
      this.restringUrls.push(itemFound.url);
      this.restringIds.push(...itemFound.btn);

      if (HIDDEN_FEATURES.includes(id)) {
        this.hiddenIds.push(...itemFound.btn);
      }

      if (itemFound?.children?.length > 0) {
        itemFound?.children.forEach((children) => this.findAndPush(children));
      }
    }
  }

  private cleanPermissions(): void {
    this.restringIds.forEach((id) => {
      const element: any = document.getElementById(id);
      if (!isNullOrUndefined(element)) {
        element.disabled = false;
        if (VALID_HTML_TAGS.includes(element.tagName.toLowerCase())) {
          element.style.opacity = '1';
        } else {
          element.children[0].style.opacity = '1';
        }
      }
    });

    this.hiddenIds.forEach((id) => {
      const element: any = document.getElementById(id);
      if (!isNullOrUndefined(element)) {
        if (VALID_HTML_TAGS.includes(element.tagName.toLowerCase())) {
          element.classList.remove('display-none');
        } else {
          element.children[0].classList.remove('display-none');
        }
      }
    });

    this.restringUrls = [];
    this.restringIds = [];
    this.hiddenIds = [];
  }*/
}
