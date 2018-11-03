import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';


/*** Interfaces ***/
import { Expenditure } from '../../../../models/expenditure.model';

/*** Services ***/
import { CurrentExpendituresService } from '../../../../services/current-expenditures.service'


@Component({
  selector: 'app-cash-expenses',
  templateUrl: './cash-expenses.component.html',
  styleUrls: ['./cash-expenses.component.css']
})
export class CashExpensesComponent implements OnInit {

 @Output() cashExpenditureAdded = new EventEmitter<Expenditure>();
  
  constructor(
    public currentExpendituresService: CurrentExpendituresService,
  ) { }

  ngOnInit() {
  }

  cashExpenditure: Expenditure;
  valueAddedTaxCash: number = 0;

  
  onAddCashExpenditure(form: NgForm){
    this.cashExpenditure = this.processForm(form)
    this.valueAddedTaxCash = this.cashExpenditure.valueAddedTax
    form.reset()
    this.currentExpendituresService.addCurrentCashExpenditures(this.cashExpenditure)
    this.cashExpenditureAdded.emit(this.cashExpenditure)
  } 


   processForm(form){
    const outputObject = Object.assign({}, form.value)
    outputObject.valueAddedTax = Math.round((outputObject.sumOfAccount * 18) / 118)
    return outputObject
  } 


}
