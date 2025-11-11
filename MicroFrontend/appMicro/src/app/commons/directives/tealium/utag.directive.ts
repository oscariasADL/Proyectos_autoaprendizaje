import { Directive, HostListener, Input } from '@angular/core';
import { environment as ENV } from '@environment';
import { UTAG_MARK } from '@commons/directives/tealium/constants/utag.constants';
import { UTAG_SURVEY_MARK } from '@commons/directives/tealium/constants/utag-survey.constants';
import { UtagEvent } from './constants/utag.entities';

declare let utag: any;

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[utag]'
})
export class UtagDirective {
  tag: string;
  cat: string;

  @Input() set utag(tag: string) {
    this.tag = tag;
  }

  @Input() set utagCategory(category: string) {
    this.cat = category;
  }

  @HostListener('click', ['$event'])
  private onClick(event) {
    this.uTagTrack();
  }

  private uTagTrack(): void {
    const tag: UtagEvent = this.filterTags(this.cat, this.tag);
    if (tag && ENV.tealium) {
      try {
        (window as any).utag_cfg_ovrd = { noview: true };
        (window as any).utag_data = {};
        utag.track(tag.track, {
          tealium_event: tag.tealium_event,
          event_category: tag.event_category,
          event_label: tag.event_label
        });
      } catch (err) {}
    }
  }

  private filterTags(category: string, label: string): UtagEvent {
    let tags = UTAG_MARK;
    let tagItem: UtagEvent | null = null;
    for (const item of tags) {
      if (item.event_category === category && item.event_label === label) {
        tagItem = item;
      }
    }
    if (!tagItem) {
      tags = UTAG_SURVEY_MARK;
      for (const item of tags) {
        if (item.event_category === category && item.event_label === label) {
          tagItem = item;
        }
      }
    }

    return tagItem;
  }
}
