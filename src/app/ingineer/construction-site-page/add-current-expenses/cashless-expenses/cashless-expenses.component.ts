import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from "@angular/material";
import { AddSellerComponent } from '../add-seller/add-seller.component'

import { NgForm } from '@angular/forms';

/*** Interfaces ***/
import { Expenditure } from '../../../../models/expenditure.model';

/*** Services ***/
import { ConstructionSiteService } from '../../../../services/construction-sites.service'

@Component({
  selector: 'app-cashless-expenses',
  templateUrl: './cashless-expenses.component.html',
  styleUrls: ['./cashless-expenses.component.css']
})
export class CashlessExpensesComponent implements OnInit {
  @Input() _id: string
  @Output() cashLessExpenditureAdded = new EventEmitter<Expenditure>();

  cashLessExpenditure: Expenditure;
  valueAddedTaxCashLess: number = 0;
  seller: any;

  onAddCashLessExpenditure(form: NgForm){
    this.cashLessExpenditure = this.processForm(form)
    this.valueAddedTaxCashLess = this.cashLessExpenditure.valueAddedTax
    this.cashLessExpenditure['seller'] = this.seller
    console.log(this.cashLessExpenditure)
    
    form.reset()
    this.constructionSiteService.addCurrentCashLessExpenditures(this._id, this.cashLessExpenditure)
    //this.cashLessExpenditureAdded.emit(this.cashLessExpenditure)
  } 

   processForm(form){
    const outputObject = Object.assign({}, form.value)
    outputObject.valueAddedTax = Math.round((outputObject.sumOfAccount * 18) / 118)
    outputObject.typeOfExpense = 'cashless'
    return outputObject
  } 

  constructor(
    private dialog: MatDialog,
    public constructionSiteService: ConstructionSiteService,
  ) { }

  ngOnInit() {
  }

  addSellerDialogRef: MatDialogRef<AddSellerComponent>

  openAddNewSellerDialog(){

     const addSellerDialogRefRef = this.dialog.open(AddSellerComponent, {
       width: '400px'
     })

     addSellerDialogRefRef.afterClosed().subscribe(newSeller => this.seller = newSeller)

  }



}
