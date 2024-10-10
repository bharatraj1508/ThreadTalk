import { Component, Input } from '@angular/core';
import { formatNumber } from '../../../core/util/helperFunction';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() question: any;

  formatNumber(num: number): string {
    return formatNumber(num);
  }
}
