import { Component, OnInit, ViewChild, OnDestroy    } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';

/* Interfaces */
import { Expenditure } from '../../../../models/expenditure.model'

/*** Services ***/
import { CurrentExpendituresService } from '../../../../services/current-expenditures.service'


@Component({
  selector: 'app-cashless',
  templateUrl: './cashless.component.html',
  styleUrls: ['./cashless.component.css']
})

export class CashlessComponent implements OnInit, OnDestroy {

  CURRENT_CASHLESS_EXPENDITURES: Expenditure[] = []
  private CURRENT_CASHLESS_EXPENDITURES_SUB: Subscription;

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

  dataSource = new MatTableDataSource<Expenditure>(this.CURRENT_CASHLESS_EXPENDITURES);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(  
    public currentExpendituresService: CurrentExpendituresService) {
     
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.CURRENT_CASHLESS_EXPENDITURES = this.currentExpendituresService.getCashLessExpenditures();

    this.CURRENT_CASHLESS_EXPENDITURES_SUB = this.currentExpendituresService.getCashLessExpendituresUpdateListener().subscribe((currentCashLessExpenditures: Expenditure[]) => {
    this.CURRENT_CASHLESS_EXPENDITURES = currentCashLessExpenditures;

    this.dataSource = new MatTableDataSource(this.CURRENT_CASHLESS_EXPENDITURES); 
  })
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  ngOnDestroy() {
    this.CURRENT_CASHLESS_EXPENDITURES_SUB.unsubscribe()
  }
}
