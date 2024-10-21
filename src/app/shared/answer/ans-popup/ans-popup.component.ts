import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Questions } from '../../../core/interfaces/questions';

@Component({
  selector: 'app-ans-popup',
  templateUrl: './ans-popup.component.html',
  styleUrl: './ans-popup.component.css',
})
export class AnsPopupComponent {
  @Input() question: Questions | null = null;
  @Output() answerFlagEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  onClick() {
    this.answerFlagEmitter.emit(true);
  }
}
