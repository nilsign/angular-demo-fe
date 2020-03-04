import { Component } from '@angular/core';
import { InputBaseComponent } from 'shared/components/input/input-base.component';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss']
})
export class InputCheckboxComponent extends InputBaseComponent {

  constructor() {
    super();
  }
}
