import { Expenditure } from './expenditure.model'

export interface CurrentExpenditures {
    cashExpenditures?: Expenditure[];
    cashlessExpenditures?: Expenditure[];
    onDutyExpenditures?: Expenditure[];
    amountOfProducts?: number;
}