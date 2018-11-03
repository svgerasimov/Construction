import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  processedProductsForPrevMonth: number;
  weight: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {processedProductsForPrevMonth: 1, name: 'тштш', weight: 1.0079},
  {processedProductsForPrevMonth: 2, name: 'штшт', weight: 4.0026},
];

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }

}
