import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { NgForm } from '@angular/forms';

/*** Interfaces ***/
import { Expenditure } from '../../../../models/expenditure.model';

/*** Services ***/
import { ConstructionSiteService } from '../../../../services/construction-sites.service'

@Component({
  selector: 'app-duty-expenses',
  templateUrl: './duty-expenses.component.html',
  styleUrls: ['./duty-expenses.component.css']
})
export class DutyExpensesComponent implements OnInit {
  @Input() _id:string;
  @Output() dutyExpenditureAdded = new EventEmitter<Expenditure>();

  dutyExpenditure: Expenditure;


  onAddDutyExpenditure(form: NgForm){
    this.dutyExpenditure = this.processForm(form)
    form.reset()
    this.constructionSiteService.addCurrentDutyExpenditures(this._id, this.dutyExpenditure)
    this.dutyExpenditureAdded.emit(this.dutyExpenditure)
  } 

   processForm(form){
    const outputObject = Object.assign({}, form.value)
    outputObject.typeOfExpense = 'duty'
    return outputObject
  } 

  constructor(
    public constructionSiteService: ConstructionSiteService,
  ) { }

  ngOnInit() {
  }

}
