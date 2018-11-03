import { Contractor } from '../models/contractor.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})

export class ContractorService{

    private contractors: Contractor[] = [];
    private contractorsUpdated = new Subject<Contractor[]>();

    getContractors() {
        return [...this.contractors];
    }

    getContractorsUpdateListener() {
        return this.contractorsUpdated.asObservable();
     }

     addContractor(contr: Contractor){
        const contractor: Contractor = contr;
        this.contractors.push(contractor) 
        this.contractorsUpdated.next([...this.contractors])
     }

     makeContractorForeman(contr: Contractor){
        const i = this.contractors.findIndex(contractor => contractor.id === contr.id)
        this.contractors[i].isForeman = true
        console.log(this.contractors[i])
     }
  
    
}