import { Component, OnInit, ViewChild, OnDestroy, Input  } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';


/*** Interfaces ***/
import { Expenditure } from "../../../../models/expenditure.model"

/*** Services ***/

import { ConstructionSiteService } from '../../../../services/construction-sites.service'

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit, OnDestroy {
  @Input() _id: string
  private constructionSites
  private constructionSites_sub: Subscription

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
    'delete'
/*      'areProductsEntered', 
    'areProductsPaid', 
    'UTDNumber', 
    'UTDDate'  */
  ];

  dataSource = new MatTableDataSource<Expenditure>(this.constructionSites);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( 
    public constructionSiteService: ConstructionSiteService,
     ){}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    this.constructionSites = this.constructionSiteService.getConstructionSites()
    this.constructionSites_sub = this.constructionSiteService.getConstructionSiteUpdateListener().subscribe((constructionSites) => {
    this.constructionSites = constructionSites
    this.dataSource = new MatTableDataSource(this.constructionSites.find(s => s._id === this._id).cashExpenditures);
      })
   }

  ngOnDestroy() {
   this.constructionSites_sub.unsubscribe()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteExpenditureItem(accountNumber: number){
    this.constructionSiteService.deleteCashExpenditureItem(this._id, accountNumber)
  }

}

