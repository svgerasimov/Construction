import { Product } from './product.model'

export interface Expenditure {
    accountNumber?: number;
    dateOfAccount?: Date;
    sumOfAccount: number;
    valueAddedTax?: number;
    paymentAppointment: string;
    itemOfExpenditure: string;

    areProductsEntered?: boolean;
    areProductsPaid?: boolean;
    UTDNumber?: number;
    UTDDate?: number;
    linkOnProduct?: any;
    seller?: string;

    products?: Product[]
    amountOfProducts?: number;

}