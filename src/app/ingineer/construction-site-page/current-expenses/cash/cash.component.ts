import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';

/*** Interfaces ***/
import { Expenditure } from "../../../../models/expenditure.model"

/*** Services ***/
import { CurrentExpendituresService } from '../../../../services/current-expenditures.service'


@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit, OnDestroy {
  CURRENT_CASH_EXPENDITURES: Expenditure[] = []
  private CURRENT_CASH_EXPENDITURES_SUB: Subscription;

  displayedColumns: string[] = [
    'itemOfExpenditure', 
    'accountNumber', 
    'dateOfAccount', 
    'seller', 
    'sumOfAccount', 
    'valueAddedTax', 
    'paymentAppointment',
     'areProductsEntered', 
    'areProductsPaid', 
    'UTDNumber', 
    'UTDDate' 
  ];

  dataSource = new MatTableDataSource<Expenditure>(this.CURRENT_CASH_EXPENDITURES);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public currentExpendituresService: CurrentExpendituresService ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  
    this.CURRENT_CASH_EXPENDITURES = this.currentExpendituresService.getCashExpenditures();

    this.CURRENT_CASH_EXPENDITURES_SUB = this.currentExpendituresService.getCashExpendituresUpdateListener().subscribe((currentCashExpenditures: Expenditure[]) => {
    this.CURRENT_CASH_EXPENDITURES = currentCashExpenditures;

    this.dataSource = new MatTableDataSource(this.CURRENT_CASH_EXPENDITURES); 

   });

  }

  ngOnDestroy() {
    this.CURRENT_CASH_EXPENDITURES_SUB.unsubscribe()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


const DATA = [
  {
    accountNumber: 678768,
    dateOfAccount: new Date(),
    itemOfExpenditure: "gyugyug",
    paymentAppointment: "рлорорлор",
    sumOfAccount: 675675,
    valueAddedTax: 103069,

  }
]



