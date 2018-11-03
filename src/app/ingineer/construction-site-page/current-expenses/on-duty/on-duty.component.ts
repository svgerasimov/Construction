import { Component, OnInit, ViewChild  } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subscription } from 'rxjs';

/* Interfaces */
import { Expenditure } from '../../../../models/expenditure.model'

/*** Services ***/
import { CurrentExpendituresService } from '../../../../services/current-expenditures.service'


@Component({
  selector: 'app-on-duty',
  templateUrl: './on-duty.component.html',
  styleUrls: ['./on-duty.component.css']
})
export class OnDutyComponent implements OnInit {
  CURRENT_DUTY_EXPENDITURES: Expenditure[] = []
  private CURRENT_DUTY_EXPENDITURES_SUB: Subscription;

  displayedColumns: string[] = [
    'itemOfExpenditure', 
    'dateOfAccount',  
    'sumOfAccount', 
    'paymentAppointment'
  ];

  dataSource = new MatTableDataSource<Expenditure>(this.CURRENT_DUTY_EXPENDITURES);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public currentExpendituresService: CurrentExpendituresService ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.CURRENT_DUTY_EXPENDITURES = this.currentExpendituresService.getDutyExpenditures();

    this.CURRENT_DUTY_EXPENDITURES_SUB = this.currentExpendituresService.getDutyExpendituresUpdateListener().subscribe((currentDutyExpenditures: Expenditure[]) => {
    this.CURRENT_DUTY_EXPENDITURES = currentDutyExpenditures;

    this.dataSource = new MatTableDataSource(this.CURRENT_DUTY_EXPENDITURES); 
  })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

