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
   private credentialsOfCreator: any =  ""
   private credentialsOfCreatorUpdated = new Subject()
   private constructionSitesUpdated = new Subject();


   constructor(private http: HttpClient){
   }


   getConstructionSites() {
   
    this.http
      .get<{message: string, constructionSites: any}>(
        'http://localhost:3000/api/construction-sites'
      )

        .subscribe((constrSitesData: {message: string, constructionSites: ConstructionSite[], credentialsOfCreator: any }) => {
            this.constructionSites = constrSitesData.constructionSites
            this.credentialsOfCreator = constrSitesData.credentialsOfCreator

            this.constructionSitesUpdated.next([...this.constructionSites])
            this.credentialsOfCreatorUpdated.next(this.credentialsOfCreator.slice(0)) 
         
        })
      
        
    }

    getCredentialsOfCreator() {
      return this.credentialsOfCreator
    }
    getCredentialsOfCreatorUpdateListener() {
      return this.credentialsOfCreatorUpdated.asObservable();
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

         this.http.patch('http://localhost:3000/api/construction-sites/add-cashless-expenditure/' + _id, cashLessExpenditure)
        .subscribe(response => {
            console.log(response)
            const updatedConstructionSites = [...this.constructionSites]
            const oldConstructionSiteIndex = updatedConstructionSites.findIndex(c => c._id === _id)
            updatedConstructionSites[oldConstructionSiteIndex].cashlessExpenditures.push(cashLessExpenditure)
           

             /* Material Costs */
            if(updatedConstructionSites[oldConstructionSiteIndex].cashlessExpenditures[updatedConstructionSites[oldConstructionSiteIndex].cashlessExpenditures.length - 1].itemOfExpenditure === 'Материалы') {
                updatedConstructionSites[oldConstructionSiteIndex].itemsOfExpenditures.materialCosts.push(cashLessExpenditure)
            }

            /* petrolOilLubricants Costs */
            if(updatedConstructionSites[oldConstructionSiteIndex].cashlessExpenditures[updatedConstructionSites[oldConstructionSiteIndex].cashlessExpenditures.length - 1].itemOfExpenditure === 'ГСМ') {
                updatedConstructionSites[oldConstructionSiteIndex].itemsOfExpenditures.petrolOilLubricantsCosts.push(cashLessExpenditure)
            }

            /* other Costs */
            if(updatedConstructionSites[oldConstructionSiteIndex].cashlessExpenditures[updatedConstructionSites[oldConstructionSiteIndex].cashlessExpenditures.length - 1].itemOfExpenditure === 'Прочее') {
                updatedConstructionSites[oldConstructionSiteIndex].itemsOfExpenditures.otherCosts.push(cashLessExpenditure)
            }



            this.constructionSites = updatedConstructionSites
            this.constructionSitesUpdated.next([...this.constructionSites])
        })
     }



     addCurrentCashExpenditures(_id: string, cashExpense: Expenditure){
         const cashExpenditure: Expenditure = cashExpense;

          this.http.patch('http://localhost:3000/api/construction-sites/add-cash-expenditure/' + _id, cashExpenditure)
        .subscribe(response => {
            const updatedConstructionSites = [...this.constructionSites]
            const oldConstructionSiteIndex = updatedConstructionSites.findIndex(c => c._id === _id)
            updatedConstructionSites[oldConstructionSiteIndex].cashExpenditures.push(cashExpenditure)


             /* Material Costs */
             if(updatedConstructionSites[oldConstructionSiteIndex].cashExpenditures[updatedConstructionSites[oldConstructionSiteIndex].cashExpenditures.length - 1].itemOfExpenditure === 'Материалы') {
                updatedConstructionSites[oldConstructionSiteIndex].itemsOfExpenditures.materialCosts.push(cashExpenditure)
            }

            /* petrolOilLubricants Costs */
            if(updatedConstructionSites[oldConstructionSiteIndex].cashExpenditures[updatedConstructionSites[oldConstructionSiteIndex].cashExpenditures.length - 1].itemOfExpenditure === 'ГСМ') {
                updatedConstructionSites[oldConstructionSiteIndex].itemsOfExpenditures.petrolOilLubricantsCosts.push(cashExpenditure)
            }

            /* other Costs */
            if(updatedConstructionSites[oldConstructionSiteIndex].cashExpenditures[updatedConstructionSites[oldConstructionSiteIndex].cashExpenditures.length - 1].itemOfExpenditure === 'Прочее') {
                updatedConstructionSites[oldConstructionSiteIndex].itemsOfExpenditures.otherCosts.push(cashExpenditure)
            }

            this.constructionSites = updatedConstructionSites
            this.constructionSitesUpdated.next([...this.constructionSites])
        }) 
     }




     addCurrentDutyExpenditures(_id:string, dutyExpense: Expenditure){
        const dutyExpenditure: Expenditure = dutyExpense;
        this.dutyExpenditures.push(dutyExpenditure) 
        this.dutyExpendituresUpdated.next([...this.dutyExpenditures]) 

        this.http.patch('http://localhost:3000/api/construction-sites/add-duty-expenditure/' + _id, dutyExpenditure)
        .subscribe(response => {
            const updatedConstructionSites = [...this.constructionSites]
            const oldConstructionSiteIndex = updatedConstructionSites.findIndex(c => c._id === _id)
            updatedConstructionSites[oldConstructionSiteIndex].dutyExpenditures.push(dutyExpenditure)

             /* Material Costs */
             if(updatedConstructionSites[oldConstructionSiteIndex].dutyExpenditures[updatedConstructionSites[oldConstructionSiteIndex].dutyExpenditures.length - 1].itemOfExpenditure === 'Материалы') {
                updatedConstructionSites[oldConstructionSiteIndex].itemsOfExpenditures.materialCosts.push(dutyExpenditure)
            }

            /* petrolOilLubricants Costs */
            if(updatedConstructionSites[oldConstructionSiteIndex].dutyExpenditures[updatedConstructionSites[oldConstructionSiteIndex].dutyExpenditures.length - 1].itemOfExpenditure === 'ГСМ') {
                updatedConstructionSites[oldConstructionSiteIndex].itemsOfExpenditures.petrolOilLubricantsCosts.push(dutyExpenditure)
            }

            /* other Costs */
            if(updatedConstructionSites[oldConstructionSiteIndex].dutyExpenditures[updatedConstructionSites[oldConstructionSiteIndex].dutyExpenditures.length - 1].itemOfExpenditure === 'Прочее') {
                updatedConstructionSites[oldConstructionSiteIndex].itemsOfExpenditures.otherCosts.push(dutyExpenditure)
            }


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
