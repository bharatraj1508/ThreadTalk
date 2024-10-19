import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Questions } from '../../../core/interfaces/questions';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  @Input() question: Questions | null = null;
  @Input() date: string = '';

  constructor(private _location: Location) {}

  goBack() {
    this._location.back();
  }
}
