import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http"

import { Expenditure } from '../../../models/expenditure.model';

@Component({
  selector: 'app-add-current-expenses',
  templateUrl: './add-current-expenses.component.html',
  styleUrls: ['./add-current-expenses.component.css']
})
export class AddCurrentExpensesComponent implements OnInit {
  @Input() _id

  private currentExpenditures = {
    cashLessExpenditures: [],
    cashExpenditures: [],
    dutyExpenditures: []
  }
  constructor( ) { }

  ngOnInit() {
  }

  onCashExpenditureAdded(expenditureData: Expenditure){

    this.currentExpenditures.cashExpenditures.push(expenditureData)
 
  }

  onCashLessExpenditureAdded(expenditureData: Expenditure) {
    this.currentExpenditures.cashLessExpenditures.push(expenditureData)

  }

  onDutyExpenditureAdded(expenditureData: Expenditure){
    this.currentExpenditures.dutyExpenditures.push(expenditureData)
 
 
  }

}
