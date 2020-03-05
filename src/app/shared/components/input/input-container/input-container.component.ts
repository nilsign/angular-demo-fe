import { Component, Input } from '@angular/core';
import { generate } from 'shortid';
import { isNil } from 'lodash';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss']
})
export class InputContainerComponent {

  @Input() label: string;
  @Input() info: string;
  @Input() markedInvalid: boolean;

  inputContainerId = generate();
  inputContainerInfoId = generate();

  hasLabel(): boolean {
    return !isNil(this.label) && this.label.trim().length !== 0;
  }

  hasInfo(): boolean {
    return !isNil(this.info) && this.info.trim().length !== 0;
  }
}
