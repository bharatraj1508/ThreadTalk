import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './prompts/error/error.component';
import { WarningComponent } from './prompts/warning/warning.component';
import { SuccessComponent } from './prompts/success/success.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './question/card/card.component';
import { ViewComponent } from './question/view/view.component';
import { AnsCardComponent } from './answer/ans-card/ans-card.component';
import { AnsPopupComponent } from './answer/ans-popup/ans-popup.component';

@NgModule({
  declarations: [
    ErrorComponent,
    WarningComponent,
    SuccessComponent,
    SidebarComponent,
    SidebarRightComponent,
    CardComponent,
    ViewComponent,
    AnsCardComponent,
    AnsPopupComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ErrorComponent,
    WarningComponent,
    SuccessComponent,
    SidebarComponent,
    SidebarRightComponent,
    CardComponent,
    ViewComponent,
    AnsCardComponent,
    AnsPopupComponent,
  ],
})
export class SharedModule {}
