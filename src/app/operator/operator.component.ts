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

  nameOfOperator: string = 'Иванова И.А';
  currentMonth: string = 'Октябрь';
  previousMonth: string = 'Сентябрь';
  newProducts: number = 10;
  currentProducts: number = 0;

 
  displayedColumns: string[] = ['processedProductsForPrevMonth', 'name', 'weight'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
