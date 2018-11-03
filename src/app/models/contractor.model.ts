export interface Contractor {
    id: number;
    isForeman?: boolean;
    name: string;
    secondName: string;
    patronymic: string;
    phone: number;
    typeOfWork: string;
    scanOfPassport?: any;
    scanOfPatent?: any;
    scanOfContractB?: any;
    scanOfContractA?: any;
}