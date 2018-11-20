import { Expenditure } from './expenditure.model'

export interface ItemsOfExpenditure {
    materialCosts?: Expenditure[],
    petrolOilLubricantsCosts?: Expenditure[],
    otherCosts?: Expenditure[],
}