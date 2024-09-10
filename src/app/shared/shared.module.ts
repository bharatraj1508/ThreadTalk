import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './prompts/error/error.component';
import { WarningComponent } from './prompts/warning/warning.component';
import { SuccessComponent } from './prompts/success/success.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';

@NgModule({
  declarations: [
    ErrorComponent,
    WarningComponent,
    SuccessComponent,
    SidebarComponent,
    SidebarRightComponent,
  ],
  imports: [CommonModule],
  exports: [
    ErrorComponent,
    WarningComponent,
    SuccessComponent,
    SidebarComponent,
    SidebarRightComponent,
  ],
})
export class SharedModule {}
