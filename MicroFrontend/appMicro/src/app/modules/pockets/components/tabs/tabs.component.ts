import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef
} from '@angular/core';

export interface Tab {
  label: string;
  disabled: boolean;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TabsComponent {
  public activeTab: number = 0;
  @Input() tabs: Tab[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ContentChildren(TemplateRef) tabTemplates!: QueryList<TemplateRef<any>>;

  public setActiveTab(tabIndex: number): void {
    if (!this.tabs[tabIndex].disabled) {
      this.activeTab = tabIndex;
    }
  }

  public isTabDisabled(tabIndex: number): boolean {
    return this.tabs[tabIndex]?.disabled || false;
  }
}
