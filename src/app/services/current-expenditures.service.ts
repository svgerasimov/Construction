import { Expenditure } from '../models/expenditure.model'

import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class CurrentExpendituresService {
    constructor(){}
   
    /* Cash */
    private cashExpenditures: Expenditure[] = []
    private CashExpendituresUpdated = new Subject<Expenditure[]>();

    getCashExpenditures(){
        return [...this.cashExpenditures]
    }

    getCashExpendituresUpdateListener() {
        return this.CashExpendituresUpdated.asObservable();
     }



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

   

     addCurrentCashLessExpenditures(cashLessExpense: Expenditure){
        const cashLessExpenditure: Expenditure = cashLessExpense;
        this.cashLessExpenditures.push(cashLessExpenditure) 
        this.CashLessExpendituresUpdated.next([...this.cashLessExpenditures]) 
     }

     addCurrentCashExpenditures(cashExpense: Expenditure){
        const cashExpenditure: Expenditure = cashExpense;
        this.cashExpenditures.push(cashExpenditure) 
        this.CashExpendituresUpdated.next([...this.cashExpenditures]) 
     }

     addCurrentDutyExpenditures(dutyExpense: Expenditure){
        const dutyExpenditure: Expenditure = dutyExpense;
        this.dutyExpenditures.push(dutyExpenditure) 
        this.dutyExpendituresUpdated.next([...this.dutyExpenditures]) 

     }



}