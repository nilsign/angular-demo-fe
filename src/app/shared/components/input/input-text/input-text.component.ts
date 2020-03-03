import { Component, OnInit } from '@angular/core';
import { InputTextBaseComponent } from 'shared/components/input/input-text/input-text-base.component';


@Component({
  selector: 'app-text-input',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends InputTextBaseComponent implements OnInit {

  constructor() {
    super();

    console.log('CTOR ==> InputTextComponent');

  }

  ngOnInit() {
    console.log('ONINIT ==> InputTextComponent');
    console.log('Label: ', this.label);
    console.log('inputFieldId: ', this.inputFieldId);
    console.log('inputFieldInfoId: ', this.inputFieldInfoId);
    console.log('---');
  }
}
