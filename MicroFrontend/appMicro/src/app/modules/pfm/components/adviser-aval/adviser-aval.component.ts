import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BankId } from '../../entities/pfm.interface';
import { environment as ENV } from '@environment';
import { PFMFacade } from '../../pfm.facade';
import { NavController } from '@ionic/angular';
import { filter, firstValueFrom, take, withLatestFrom } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { PFMService } from '@modules/pfm/services/pfm.service';

@Component({
  selector: 'app-adviser-aval',
  templateUrl: './adviser-aval.component.html',
  styleUrls: ['./adviser-aval.component.sass']
})
export class AdviserAvalComponent implements OnInit, AfterViewInit {
  public readonly bankID: BankId = 'bavv';
  public readonly adviserENV = ENV.api.services.pfm.adviser_aval.environment;
  public channel: string = 'bancaMovil';
  public viewAdviser = false;

  constructor(
    private pfmFacade: PFMFacade,
    private navController: NavController,
    private service: PFMService
  ) {}

  ngOnInit(): void {
    this.service.loadConsejeroScript();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ionViewDidEnter();
    }, 3000);
  }

  ionViewDidEnter() {
    const isIOS = Capacitor.getPlatform() === 'ios';
    const mutationObserver = new MutationObserver((mutationsList, observer) => {
      const adviserElement = document.querySelector('#adviser-aval');
      if (adviserElement) {
        observer.disconnect();
        const shadowRoot1 = adviserElement.shadowRoot;
        if (shadowRoot1) {
          const webChatAval = shadowRoot1.querySelector('.idw-web-chat-aval');
          if (webChatAval && webChatAval.shadowRoot) {
            const webChat = webChatAval.shadowRoot.querySelector(
              '.idw-web-chat-aval--button'
            );
            if (isIOS) {
              webChat.setAttribute('style', 'bottom: 120px !important');
            } else {
              // webChat.setAttribute('style', 'bottom: 85px !important');
            }
          }
        }
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  public async startConversation(): Promise<unknown> {
    this.pfmFacade.advisorStartConversation();
    const isAdvisorWorking$ = this.pfmFacade.isAdvisorWorking$.pipe(
      filter((isWorking) => !isWorking),
      withLatestFrom(this.pfmFacade.getAdviserAccessToken$),
      take(1)
    );
    return new Promise(async (resolve) => {
      try {
        const [_, accessToken] = await firstValueFrom(isAdvisorWorking$);
        if (accessToken) {
          this.viewAdviser = true;
        }
        resolve({ access_token: accessToken });
      } catch (error) {
        throw Error(error);
      }
    });
  }

  public adviserNavigate(path: string): void {
    void this.navController.navigateForward(path);
  }
}
