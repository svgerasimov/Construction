import { ContactPerson } from './contact-person.model';
import { CurrentExpenditures } from './current-expenditures.model';
import { PlanningExpenditures } from './planning-expenditures.model';
import { Contractor } from './contractor.model';



export interface ConstructionSite {
    id?: string;
    nameOfConstructionSite?: string;
    customer?: string;
    deadline?: Date;
    valueOfContract?: number;
    currentExpenditures?: CurrentExpenditures;
    planningExpenditures?: PlanningExpenditures;

    dateOfWinningOfTender?: Date;
    planningDateOfSigningTender?: Date;
    planningDateOfStartingOfWork?: Date;
    timelimitForWork?: Object;

    actualDateOfSigningContract?: Date;
    actualDateOfStartingWork?: Date;
    planningDateOfCompletionOfWorks?: Date;
    planningDateOfPaymentContract?: Date;

    timelimitForPaymentContract?: Object;
    contactPersons?: ContactPerson[];
  
    contractors?: Contractor[];
    
    operationalCosts?: number;
    bonus?: number;
    isCertificateOfCompletionOfWorksSigned?: boolean;
    isContractPaid?: boolean;
    isBonusPaid?: boolean;
}


