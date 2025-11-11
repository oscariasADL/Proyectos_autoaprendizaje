import { Injectable } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { DropdownList } from '@modules/forms-avv/entities/dropdown.interface';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';
import { ParameterType } from '@store/state/parameter.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WithdrawalChannelsStepFacade extends AppFacade {
  get withdrawalChannels$(): Observable<DropdownList[]> {
    return this.parameterByKey(ParameterType.withdrawalChannels).pipe(
      map((channels) =>
        channels.map((channel) => ({
          ...channel,
          icon:
            channel.value === ChannelType.CB ? 'icon-ubicacion' : 'icon-retiro'
        }))
      )
    );
  }
}
