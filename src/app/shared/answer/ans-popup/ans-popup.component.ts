import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Questions } from '../../../core/interfaces/questions';
import { ViewEncapsulation } from '@angular/core';
import { AnswersService } from '../../../core/services/answersApi/answers.service';
import { Answers } from '../../../core/interfaces/answers';
import { NgForm } from '@angular/forms';

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
  @Output() answerEmitter: EventEmitter<Answers> = new EventEmitter<Answers>();
  editorContent: string | null = null;
  submitted: boolean = false;

  constructor(private _answerApi: AnswersService) {}

  QuillConfiguration = QuillConfiguration;

  onClick() {
    this.answerFlagEmitter.emit(true);
  }

  postAnswer() {
    this.submitted = true;
    this.createAnswer();
  }

  createAnswer() {
    const ansBody = {
      body: this.editorContent,
    };
    this._answerApi.createAnswer(this.question!._id, ansBody).subscribe(
      (res) => {
        this.editorContent = null;
        this.answerEmitter.emit(res);
        this.answerFlagEmitter.emit(true);
      },
      (err) => {}
    );
  }
}
