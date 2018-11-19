import { ContactPerson } from './contact-person.model';
import { CurrentExpenditures } from './current-expenditures.model';
import { PlanningExpenditures } from './planning-expenditures.model';
import { Contractor } from './contractor.model';
import { Deadlines } from './deadlines.model';



export interface ConstructionSite {
    _id?: string
    nameOfConstructionSite?: string;
    customer?: string;
    deadline?: any;
    valueOfContract?: number;
    currentExpenditures?: CurrentExpenditures;
    planningExpenditures?: PlanningExpenditures;

    deadlines?: Deadlines;

    contactPersons?: ContactPerson[];
  
    contractors?: Contractor[];
    
    operationalCosts?: number;
    bonus?: number;
    isCertificateOfCompletionOfWorksSigned?: boolean;
    isContractPaid?: boolean;
    isBonusPaid?: boolean;
}


