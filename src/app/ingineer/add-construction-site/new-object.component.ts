import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter} from "@angular/material";
import { Router } from '@angular/router';


import { CustomDateAdapter } from './date.adapter'



/*** Interfaces ***/
import { ContactPerson } from "../../models/contact-person.model"
import { ConstructionSite } from "../../models/construction-site.model"

/*** Services ***/
import { ConstructionSiteService } from '../../services/construction-sites.service'



@Component({
  selector: 'app-new-object',
  templateUrl: './new-object.component.html',
  styleUrls: ['./new-object.component.css'],
  providers: [

     {
        provide: DateAdapter, useClass: CustomDateAdapter
    } 

]

})

export class NewObjectComponent implements OnInit {

    name: string;
    secondName: string;
    patronymic: string;
    position: string;
    phone: number;
    email: any;
    typeOfWork: string;

    isPlanningFigureFilled: boolean = false;

    contactPersons: ContactPerson[] = [];
    constructionSite: ConstructionSite;


  constructor(
    private dialog: MatDialog,
    public constructionSiteService: ConstructionSiteService,
    private router: Router,
   
    ){
      this.constructionSite = {}
    }


  openDialog(){
    const dialogRef = this.dialog.open(AddContactModal, {
      width: '300px',
      data: {
        name: this.name, 
        secondName: this.secondName,
        patronymic: this.patronymic,
        position: this.position,
        phone: this.phone,
        email: this.email,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.name && result.secondName && result.position){
        this.contactPersons.push(result)
      }
      
    });   
  }

  ngOnInit() {
  }

  onAddConstructionSiteData(form: NgForm){
  
      const constructionSiteData: any = {
        deadlines: {}
      }
      
      for (let entry in form.value){
       if(form.value[entry] !== ""){

          if(form.value[entry] instanceof Date || entry.includes("timeLimit")){
            constructionSiteData.deadlines[entry] = form.value[entry] 
            continue
          }
          constructionSiteData[entry] = form.value[entry]
        }
      }

      for(let entry in constructionSiteData){
        this.constructionSite[entry] = constructionSiteData[entry];
      }

       if(this.contactPersons){
        this.constructionSite.contactPersons = this.contactPersons;
      } 


      this.constructionSiteService.addConstructionSite(this.constructionSite)

       this.router.navigate(['ingineer'])
    
  }


  onAddFinances(form: NgForm){

   
       const planningExpenses = Object.assign({}, form.value)

    
       const planningExpensesToCalculate = Object.assign({}, planningExpenses)
     
       

      let valuesToCalculate = Object.values(planningExpensesToCalculate)

      let sumOfExpenses = parseInt(Object.keys(valuesToCalculate).
      map(key => valuesToCalculate[key]).
      reduce((a,b)=> a + b))

      planningExpenses.sumOfCosts = sumOfExpenses

      this.constructionSite.planningExpenditures = planningExpenses
      this.isPlanningFigureFilled = true 

      
  }
}


@Component({
  selector: 'add-contact-modal',
  templateUrl: 'add-contact-modal.html',
})
export class AddContactModal {

  constructor(
    public dialogRef: MatDialogRef<AddContactModal>,
    @Inject(MAT_DIALOG_DATA) public data: ContactPerson) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


