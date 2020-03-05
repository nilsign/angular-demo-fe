import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputTextBaseComponent } from 'shared/components/input/input-text/input-text-base.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent extends InputTextBaseComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(this.getFormControl().valueChanges.subscribe((value: string) => {
      if (value === '') {
        this.getFormControl().markAsUntouched();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}