import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Questions } from '../../../core/interfaces/questions';
import { ViewEncapsulation } from '@angular/core';

export const QuillConfiguration = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ script: 'sub' }, { script: 'super' }],
  ],
};

@Component({
  selector: 'app-ans-popup',
  templateUrl: './ans-popup.component.html',
  styleUrl: './ans-popup.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AnsPopupComponent {
  @Input() question: Questions | null = null;
  @Output() answerFlagEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  QuillConfiguration = QuillConfiguration;

  onClick() {
    this.answerFlagEmitter.emit(true);
  }
}
