import { HttpClient } from "@angular/common/http"

/**** Interfaces ****/
import { ConstructionSite } from '../models/construction-site.model'

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contractor } from '../models/contractor.model'
import { Expenditure } from '../models/expenditure.model'

@Injectable({providedIn: 'root'})

export class ConstructionSiteService {
    /* Строительные объекты */
   private constructionSites = [];
   private constructionSitesUpdated = new Subject();


   constructor(private http: HttpClient){
   }


   getConstructionSites() {
   
    this.http
      .get<{message: string, constructionSites: any}>(
        'http://localhost:3000/api/construction-sites'
      )

        .subscribe((constrSitesData) => {
            console.log(constrSitesData)
            this.constructionSites = constrSitesData.constructionSites
            
            this.constructionSitesUpdated.next([...this.constructionSites])
        })
        
    }

    getConstructionSiteUpdateListener() {
        return this.constructionSitesUpdated.asObservable();
    }


    getConstructionSite(_id: string){
       return this.http.get('http://localhost:3000/api/construction-sites/' + _id)
    }


    addConstructionSite(constSite: ConstructionSite){
        const constructionSite: ConstructionSite = constSite;
          this.http.post<{message: string}>('http://localhost:3000/api/construction-sites', constructionSite)
        .subscribe((resData) => {
            console.log(resData)
        });
    }


    updateConstructionSiteCurrentDeadlines(_id: string, currentDeadlines: {
        actualDateOfSigningContract: Date,
        actualDateOfStartingWork: Date,                                      
        planningDateOfCompletionOfWorks: Date,                                      
        planningDateOfPaymentContract: Date                                      
    }){
       
          this.http.patch('http://localhost:3000/api/construction-sites/' + _id, currentDeadlines)
        .subscribe(response => console.log(response)) 

    }




/******  CURRENT EXPENDITURES *******/

     /* Cash */
/*     private cashExpenditures: Expenditure[] = []
    private CashExpendituresUpdated = new Subject<Expenditure[]>();

    getCashExpenditures(){
        return [...this.cashExpenditures]
    }

    getCashExpendituresUpdateListener() {
        return this.CashExpendituresUpdated.asObservable();
     } */

    /* CashLess */
    private cashLessExpenditures: Expenditure[] = []
    private CashLessExpendituresUpdated = new Subject<Expenditure[]>();

    getCashLessExpenditures(){
        return [...this.cashLessExpenditures]
    }

    getCashLessExpendituresUpdateListener() {
        return this.CashLessExpendituresUpdated.asObservable();
     }



    /* Duty Expenses */
    private dutyExpenditures: Expenditure[] = []
    private dutyExpendituresUpdated = new Subject<Expenditure[]>();

    getDutyExpenditures(){
        return [...this.dutyExpenditures]
    }

    getDutyExpendituresUpdateListener() {
        return this.dutyExpendituresUpdated.asObservable();
     }


     addCurrentCashLessExpenditures(_id: string, cashLessExpense: Expenditure){
        const cashLessExpenditure: Expenditure = cashLessExpense;
        this.cashLessExpenditures.push(cashLessExpenditure) 
        this.CashLessExpendituresUpdated.next([...this.cashLessExpenditures])
         this.http.patch('http://localhost:3000/api/construction-sites/' + _id, cashLessExpenditure)
        .subscribe(response => {
            const updatedConstructionSites = [...this.constructionSites]
            const oldConstructionSiteIndex = updatedConstructionSites.findIndex(c => c._id === _id)
            updatedConstructionSites[oldConstructionSiteIndex].cashlessExpenditures.push(cashLessExpenditure)
            this.constructionSites = updatedConstructionSites
            this.constructionSitesUpdated.next([...this.constructionSites])
        })
     }



     addCurrentCashExpenditures(_id: string, cashExpense: Expenditure){
         const cashExpenditure: Expenditure = cashExpense;
/*         this.cashExpenditures.push(cashExpenditure)
        this.CashExpendituresUpdated.next([...this.cashExpenditures]) */
          this.http.patch('http://localhost:3000/api/construction-sites/' + _id, cashExpenditure)
        .subscribe(response => {
            const updatedConstructionSites = [...this.constructionSites]
            const oldConstructionSiteIndex = updatedConstructionSites.findIndex(c => c._id === _id)
            updatedConstructionSites[oldConstructionSiteIndex].cashExpenditures.push(cashExpenditure)
            this.constructionSites = updatedConstructionSites
            this.constructionSitesUpdated.next([...this.constructionSites])
        }) 
     }

     addCurrentDutyExpenditures(_id:string, dutyExpense: Expenditure){
        const dutyExpenditure: Expenditure = dutyExpense;
        this.dutyExpenditures.push(dutyExpenditure) 
        this.dutyExpendituresUpdated.next([...this.dutyExpenditures]) 
         this.http.patch('http://localhost:3000/api/construction-sites/' + _id, dutyExpenditure)
        .subscribe(response => {
            const updatedConstructionSites = [...this.constructionSites]
            const oldConstructionSiteIndex = updatedConstructionSites.findIndex(c => c._id === _id)
            updatedConstructionSites[oldConstructionSiteIndex].dutyExpenditures.push(dutyExpenditure)
            this.constructionSites = updatedConstructionSites
            this.constructionSitesUpdated.next([...this.constructionSites])
        }) 
     }


      /* Contractors */
     addContractor(_id: string, contr: Contractor){
        
         const contractor: Contractor = contr;

         
         const constructionSiteData = new FormData();
        constructionSiteData.append("name", contractor.name)
        constructionSiteData.append("secondName", contractor.secondName)
        constructionSiteData.append("patronymic", contractor.patronymic)
        constructionSiteData.append("phone", contractor.phone)
        constructionSiteData.append("typeOfWork", contractor.typeOfWork)

         for(let i =0; i < contractor.docsFiles.length; i++){
            constructionSiteData.append("docsFiles[]", contractor.docsFiles[i], contractor.docsFiles[i]['name']);
        }

    
          this.http.patch('http://localhost:3000/api/construction-sites/new-contractors/' + _id, constructionSiteData)
        .subscribe(response => {

            const updatedConstructionSites = [...this.constructionSites]
            const oldConstructionSiteIndex = updatedConstructionSites.findIndex(c => c._id === _id)
            if(!updatedConstructionSites[oldConstructionSiteIndex].contractors) {
                updatedConstructionSites[oldConstructionSiteIndex].contractors = []
            } else {
                 if (response.hasOwnProperty('docsPaths')) {
                    contractor.docsPaths = response['docsPaths']
                } 

                updatedConstructionSites[oldConstructionSiteIndex].contractors.push(contractor)
                this.constructionSites = updatedConstructionSites
                this.constructionSitesUpdated.next([...this.constructionSites])
            }
        
        })
     }

     makeContractorForeman(_id: string, contr: Contractor){
        const contractor: Contractor = contr;
        this.http.patch('http://localhost:3000/api/construction-sites/' + _id, contractor)
        .subscribe(response => {
            const updatedConstructionSites = [...this.constructionSites]
            const oldConstructionSiteIndex = updatedConstructionSites.findIndex(c => c._id === _id)
            const i = updatedConstructionSites[oldConstructionSiteIndex].contractors.findIndex(contractor => contractor.name === contr.name)
            updatedConstructionSites[oldConstructionSiteIndex].contractors[i].isForeman = true
            this.constructionSites = updatedConstructionSites
            this.constructionSitesUpdated.next([...this.constructionSites])
        }) 
        /* const i = this.contractors.findIndex(contractor => contractor.name === contr.name) */
       // this.contractors[i].isForeman = true
     }

}
