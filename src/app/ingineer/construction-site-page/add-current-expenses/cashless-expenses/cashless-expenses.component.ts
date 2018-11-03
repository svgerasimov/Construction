import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

import { NgForm } from '@angular/forms';

/*** Interfaces ***/
import { Expenditure } from '../../../../models/expenditure.model';

/*** Services ***/
import { CurrentExpendituresService } from '../../../../services/current-expenditures.service'

@Component({
  selector: 'app-cashless-expenses',
  templateUrl: './cashless-expenses.component.html',
  styleUrls: ['./cashless-expenses.component.css']
})
export class CashlessExpensesComponent implements OnInit {

  @Output() cashLessExpenditureAdded = new EventEmitter<Expenditure>();

  cashLessExpenditure: Expenditure;
  valueAddedTaxCashLess: number = 0;

  onAddCashLessExpenditure(form: NgForm){
    this.cashLessExpenditure = this.processForm(form)
    this.valueAddedTaxCashLess = this.cashLessExpenditure.valueAddedTax
    form.reset()
    this.currentExpendituresService.addCurrentCashLessExpenditures(this.cashLessExpenditure)
    this.cashLessExpenditureAdded.emit(this.cashLessExpenditure)
  } 

   processForm(form){
    const outputObject = Object.assign({}, form.value)
    outputObject.valueAddedTax = Math.round((outputObject.sumOfAccount * 18) / 118)
    return outputObject
  } 

  constructor(
    public currentExpendituresService: CurrentExpendituresService,
  ) { }

  ngOnInit() {
  }



}
