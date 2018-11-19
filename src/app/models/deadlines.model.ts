export interface Deadlines {
    dateOfWinningOfTender?: Date;
    planningDateOfSigningTender?: Date;
    planningDateOfStartingOfWork?: Date;

    actualDateOfSigningContract?: Date;
    actualDateOfStartingWork?: Date;
    planningDateOfCompletionOfWorks?: Date;
    planningDateOfPaymentContract?: Date;

    timeLimitForPaymentContract?: Number,
    timeLimitForPaymentContractDays?: String,
    timeLimitForWork?: Number,
    timeLimitForWorkDays?: String,
}