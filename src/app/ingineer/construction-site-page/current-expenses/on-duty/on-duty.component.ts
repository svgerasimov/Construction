import { Component, OnInit, ViewChild, Input, OnDestroy} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';


/* Interfaces */
import { Expenditure } from '../../../../models/expenditure.model'

/*** Services ***/
import { ConstructionSiteService } from '../../../../services/construction-sites.service'


@Component({
  selector: 'app-on-duty',
  templateUrl: './on-duty.component.html',
  styleUrls: ['./on-duty.component.css']
})
export class OnDutyComponent implements OnInit, OnDestroy {
  @Input() _id:string
  private constructionSites
  private constructionSites_sub: Subscription

  CURRENT_DUTY_EXPENDITURES: Expenditure[] = []
  private CURRENT_DUTY_EXPENDITURES_SUB: Subscription;

  displayedColumns: string[] = [
    'itemOfExpenditure', 
    'dateOfAccount',  
    'sumOfAccount', 
    'paymentAppointment'
  ];

  dataSource = new MatTableDataSource<Expenditure>(this.constructionSites);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public constructionSiteService: ConstructionSiteService ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.constructionSites = this.constructionSiteService.getConstructionSites()
    this.constructionSites_sub = this.constructionSiteService.getConstructionSiteUpdateListener().subscribe((constructionSites) => {
    this.constructionSites = constructionSites
    this.dataSource = new MatTableDataSource(this.constructionSites.find(s => s._id === this._id).dutyExpenditures);
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

}

