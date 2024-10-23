import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatNumber } from '../../../core/util/helperFunction';
import { Questions } from '../../../core/interfaces/questions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() question: Questions | null = null;
  @Output() answerFlagEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() currentQuestion: EventEmitter<Questions> =
    new EventEmitter<Questions>();

  formatNumber(num: number): string {
    return formatNumber(num);
  }

  onClick() {
    this.answerFlagEmitter.emit(true);
    this.currentQuestion.emit(this.question!);
  }
}
