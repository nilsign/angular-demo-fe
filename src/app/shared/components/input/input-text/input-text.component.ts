import { Component, OnInit } from '@angular/core';
import { InputTextBaseComponent } from 'shared/components/input/input-text/input-text-base.component';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends InputTextBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
