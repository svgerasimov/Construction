import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material'; 

@Component({
  selector: 'app-ingineer',
  templateUrl: './ingineer.component.html',
  styleUrls: ['./ingineer.component.css']
})
export class IngineerComponent implements OnInit {
  name: string = 'Астахов В.Г';
  cash: number = 80458;
  cashLess: number = 159548;
  docsDebt: boolean = true;

  displayedColumns: string[] = ['position', 'name', 'customer', 'deadline', 'value', 'plannedExpenses', 'currentExpenses'];
  dataSource = new MatTableDataSource<ObjectInfo>(OBJECTS_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface ObjectInfo {
  name: string;
  position: number;
  customer: string;
  deadline: Date;
  value: number;
  plannedExpenses: number;
  currentExpenses: number;
}

const OBJECTS_DATA: ObjectInfo[] = [
  {position: 1, name: 'Ремонт кабинета географии', customer: 'МБОУ СОШ №39', deadline: new Date(), value: 40000, plannedExpenses: 25000, currentExpenses: 2000},
  {position: 2, name: 'Выполнение работ по ремонту фасада', customer: 'МБОУ СОШ №39', deadline: new Date(), value: 500000, plannedExpenses: 398000, currentExpenses: 45000}
]
