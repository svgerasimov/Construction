    const mongoose = require('mongoose');


    const constructionSiteSchema = mongoose.Schema({

        nameOfConstructionSite:  String,
        customer: String,
        valueOfContract: Number,
        creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
 
        planningExpenditures: {
            materialCosts: Number,
            wageFundDeductions: Number,
            petrolOilLubricantsCosts: Number,
            otherCosts: Number,
            proposalSecurity: Number ,
            contractSecurity: Number,
            sumOfCosts: Number
        },
         contactPersons: [{
            name: String,
            secondName: String,
            patronymic: String,
            position: String,
            phone: Number,
            email: String
        }],
       // deadline: {type: Date}

       deadlines: {
        dateOfWinningOfTender: {type: Date},
        planningDateOfSigningTender: {type: Date},
        planningDateOfStartingOfWork: {type: Date},
   
        timeLimitForPaymentContract: Number,
        timeLimitForPaymentContractDays: String,
        timeLimitForWork: Number,
        timeLimitForWorkDays: String,
       },

        currentDeadlines: {
        actualDateOfSigningContract: Date,
        actualDateOfStartingWork: Date,                                      
        planningDateOfCompletionOfWorks: Date,                                      
        planningDateOfPaymentContract: Date  
       },

       contractors: [{
            isForeman: Boolean,
            name: String,
            secondName: String,
            patronymic: String,
            phone: Number,
            typeOfWork: String,
            docsPaths: Array
           }],

            cashExpenditures: [{
                accountNumber: Number,
                dateOfAccountCash: Date,
                sumOfAccount: Number,
                paymentAppointment: String,
                itemOfExpenditure: String,
                valueAddedTax: Number,
                typeOfExpense: String,
                seller: {name: String, inn: Number },
                
                
            }],
            cashlessExpenditures: [{
                accountNumber: Number,
                dateOfAccountCashLess: Date,
                sumOfAccount: Number,
                paymentAppointment: String,
                itemOfExpenditure: String,
                valueAddedTax: Number,
                typeOfExpense: String,
                seller: {name: String, inn: Number },
            }],
            dutyExpenditures: [{
                dateOfAccountDuty: Date,
                sumOfAccount: Number,
                paymentAppointment: String,
                itemOfExpenditure: String,
                typeOfExpense: String
            }]
    })

    module.exports = mongoose.model('ConstructionSite', constructionSiteSchema)

