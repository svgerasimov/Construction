import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ParamMap} from '@angular/router';
import { ActivatedRoute } from '@angular/router'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from "@angular/material";
import { AddSellerComponent } from '../add-seller/add-seller.component'


/*** Interfaces ***/
import { Expenditure } from '../../../../models/expenditure.model';

/*** Services ***/
import { ConstructionSiteService } from '../../../../services/construction-sites.service'


@Component({
  selector: 'app-cash-expenses',
  templateUrl: './cash-expenses.component.html',
  styleUrls: ['./cash-expenses.component.css']
})
export class CashExpensesComponent implements OnInit {
  isSellerAdded: boolean = false
  @Input() _id: string;

 @Output() cashExpenditureAdded = new EventEmitter<Expenditure>();

 itemsOfExpenditure = [
  {
    value: 'Материалы'
  },
  {
    value: 'ГСМ'
  },
  {
    value: 'Прочее'
  }
]
  
  constructor(
    private dialog: MatDialog,
    public constructionSiteService: ConstructionSiteService,
  ) { }

  ngOnInit() {
  }

  cashExpenditure: Expenditure;
  valueAddedTaxCash: number = 0;
  seller: any;

  
  onAddCashExpenditure(form: NgForm){
    this.cashExpenditure = this.processForm(form)
    this.cashExpenditure['seller'] = this.seller
    this.valueAddedTaxCash = this.cashExpenditure.valueAddedTax
    form.reset()
    this.constructionSiteService.addCurrentCashExpenditures(this._id, this.cashExpenditure)
   // this.cashExpenditureAdded.emit(this.cashExpenditure)
  } 


   processForm(form){
    const outputObject = Object.assign({}, form.value)
    outputObject.valueAddedTax = Math.round((outputObject.sumOfAccount * 18) / 118)
    outputObject.typeOfExpense = 'cash'
    return outputObject
  } 



  
  addSellerDialogRef: MatDialogRef<AddSellerComponent>

  openAddNewSellerDialog(){

     const addSellerDialogRefRef = this.dialog.open(AddSellerComponent, {
       width: '400px'
     })

     addSellerDialogRefRef.afterClosed().subscribe(newSeller => this.seller = newSeller)

     this.isSellerAdded = true

  }
}
