import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material'; 

/** Interfaces **/
import { ConstructionSite } from '../../../models/construction-site.model';
import { PlanningExpenditures } from '../../../models/planning-expenditures.model';

@Component({
  selector: 'app-finished-construction-sites',
  templateUrl: './finished-construction-sites.component.html',
  styleUrls: ['./finished-construction-sites.component.css']
})
export class FinishedConstructionSitesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'position', 
    'nameOfConstructionSite', 
    'customer', 
    'deadlineOfTender', 
    'valueOfWork', 
    'planningFigure', 
    'currentExpenditure', 
    'operationalCosts',
    'premiumPay',
    'isPremiumPayGranted'
  ];

  dataSource = new MatTableDataSource(FINISHED_CONSTRUCTION_SITES_DATA);

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

const FINISHED_CONSTRUCTION_SITES_DATA = [
  {
    position: 1, 
    nameOfConstructionSite: 'Ремонт кабинета географии', 
    customer: 'МБОУ СОШ №39', 
    deadline: new Date(), 
    valueOfContract: 40000,  
    currentExpenditures: 2330,
    operationalCosts: 1289,
    premiumPay: 2354,
    isPremiumPayGranted: true
  },
  {
    position: 2, 
    nameOfConstructionSite: 'Выполнение работ по ремонту фасада', 
    customer: 'МБОУ СОШ №39', 
    deadlineOfTender: new Date(), 
    valueOfWork: 500000, 
    //planningFigure: 398000,
    currentExpenditure: 34530,
    operationalCosts: 1123,
    premiumPay: 1749,
    isPremiumPayGranted: false
  }
]
