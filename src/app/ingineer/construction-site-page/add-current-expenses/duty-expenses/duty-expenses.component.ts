import { Component, OnInit, Output, EventEmitter   } from '@angular/core';
import { NgForm } from '@angular/forms';

/*** Interfaces ***/
import { Expenditure } from '../../../../models/expenditure.model';

/*** Services ***/
import { CurrentExpendituresService } from '../../../../services/current-expenditures.service'

@Component({
  selector: 'app-duty-expenses',
  templateUrl: './duty-expenses.component.html',
  styleUrls: ['./duty-expenses.component.css']
})
export class DutyExpensesComponent implements OnInit {
  @Output() dutyExpenditureAdded = new EventEmitter<Expenditure>();

  dutyExpenditure: Expenditure;


  onAddDutyExpenditure(form: NgForm){
    this.dutyExpenditure = this.processForm(form)
    form.reset()
    this.currentExpendituresService.addCurrentDutyExpenditures(this.dutyExpenditure)
    this.dutyExpenditureAdded.emit(this.dutyExpenditure)
  } 

   processForm(form){
    return Object.assign({}, form.value)
  } 

  constructor(
    public currentExpendituresService: CurrentExpendituresService
  ) { }

  ngOnInit() {
  }

}
