import { Component, Input } from '@angular/core';
import { Answers } from '../../../core/interfaces/answers';

@Component({
  selector: 'app-ans-card',
  templateUrl: './ans-card.component.html',
  styleUrl: './ans-card.component.css',
})
export class AnsCardComponent {
  @Input() answers: Answers[] = [];
}
