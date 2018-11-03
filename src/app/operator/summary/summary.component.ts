import { Component, OnInit } from '@angular/core';

import { MonthlyProcessedProducts } from '../models/processedProducts.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  
  months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  date = new Date();


  nameOfOperator: string = 'Иванова И.А';
  currentMonth: string = this.months[this.date.getMonth()];
  previousMonth: string = this.months[this.date.getMonth() - 1];
  newProducts: number = 10;
  currentProducts: number = 0;

 
  displayedColumns: string[] = ['processedProductsForPrevMonth', 'name', 'weight'];
  //dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
