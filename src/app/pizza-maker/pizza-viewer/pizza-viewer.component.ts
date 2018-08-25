import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { PizzasService } from '../services/pizzas.service';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate(
      '300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(0)', opacity: 1 })
    )
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
      '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(-200px)', opacity: 0 })
    )
  ])
]);

@Component({
  selector: 'pizza-viewer',
  templateUrl: './pizza-viewer.component.html',
  styleUrls: ['./pizza-viewer.component.scss'],
  animations: [DROP_ANIMATION]
})
export class PizzaViewerComponent implements OnInit {
  public serviceSelectedIndex: number;
  @Input()
  pizzas: FormArray;

  @Input()
  activePizza: number;

  constructor(private pizzasService: PizzasService) {}

  ngOnInit() {
    this.pizzasService.$pizzaSelectedIndex.subscribe(
      this._updateServiceSelectedIndex
    );
  }

  private _updateServiceSelectedIndex = index => {
    console.log('Pizza selected index: ' + index);
    this.serviceSelectedIndex = index;
  }
}
