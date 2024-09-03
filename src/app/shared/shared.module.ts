import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './prompts/error/error.component';
import { WarningComponent } from './prompts/warning/warning.component';
import { SuccessComponent } from './prompts/success/success.component';

@NgModule({
  declarations: [ErrorComponent, WarningComponent, SuccessComponent],
  imports: [CommonModule],
  exports: [ErrorComponent, WarningComponent, SuccessComponent],
})
export class SharedModule {}
