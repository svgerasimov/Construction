const express = require('express');
const multer = require('multer');
const router = express.Router();

const checkAuth = require("../middleware/check-auth")

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'application/pdf': 'pdf'

}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
         const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error("Invalid mime type")
        if(isValid){
            error = null
        }
        cb(null, "backend/uploads")
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-')
         const ext = MIME_TYPE_MAP[file.mimetype]
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
})


const ConstructionSite = require('../models/construction-site')

router.post("", checkAuth,  (req, res, next) => {
    const constructionSite = new ConstructionSite({
         nameOfConstructionSite: req.body.nameOfConstructionSite,
         customer: req.body.customer,
         valueOfContract: req.body.valueOfContract,
         planningExpenditures: req.body.planningExpenditures,
         contactPersons: req.body.contactPersons,
         deadlines: req.body.deadlines,
         creator: req.userData.userId,
    })
    constructionSite.save()
   
    res.status(201).json({message: "Post was added successfully"})
 })
 
 router.get("", checkAuth, (req, res, next) => {
     ConstructionSite.find({creator: req.userData.userId})
         .then(documents => {
             res.status(200).json({
                 message: 'Construction sites fetched successfully',
                 constructionSites: documents,
                 credentialsOfCreator: `${req.userData.userName} ${req.userData.userSecondName}`
             })
         })
         .catch(() => {
             console.log("Connection failed")
         });
     
 });
 
 router.get("/:_id", (req, res, next) => {
 
     ConstructionSite.findById(req.params._id).then(constructionSite => {
         if(constructionSite) {
             res.status(200).json(constructionSite)
         } else {
             res.status(404).json({message: 'ConstructionSite not found'})
         }
     })
 })
 
 
 router.patch("/:_id", checkAuth, (req, res, next) => {
     
 /*     if (req.body.typeOfExpense === 'cash') {
         ConstructionSite.updateOne(
             {_id: req.params._id},
             {
                 $push: {
                     cashExpenditures: req.body
                 }
             }
   
         )
         .then(result => {
             res.status(200).json({ message: "cashExpenditures updated successfully"}) 
         })
     } */ 
     /*  else if (req.body.typeOfExpense === 'cashless') {
         ConstructionSite.updateOne(
             {_id: req.params._id},
             {
                $push:{
                     cashlessExpenditures: req.body
                } 
             }
         )
         .then(result => {
             res.status(200).json({ message: "cashlessExpenditures updated successfully"}) 
         })
     } */ 
/*        if (req.body.typeOfExpense === 'duty') {
         ConstructionSite.updateOne(
             {_id: req.params._id},
 
             {
                $push: {
                     dutyExpenditures: req.body
                } 
             }
         )
         .then(result => {
     
             res.status(200).json({ message: "dutyExpenditures updated successfully"}) 
         })
     }  */
     
      if (req.body.actualDateOfSigningContract) {
         ConstructionSite.updateOne(
             {_id: req.params._id},
             {currentDeadlines: req.body} 
          ).then(result => {
              console.log(result)
              res.status(200).json({ message: "currentDeadlines Updated successfull"})
          })
     }
 })

 /***Расходы***/
router.patch("/add-cashless-expenditure/:_id", checkAuth, (req, res, next)=> {
    const itemOfExpenditure = req.body.itemOfExpenditure

    /* Расходы на материалы */
    if(itemOfExpenditure === 'Материалы'){
            ConstructionSite.updateOne(
                {_id: req.params._id},
                {
                    $push:{
                        "itemsOfExpenditures.materialCosts": {
                            accountNumber: req.body.accountNumber,
                            dateOfAccount:req.body.dateOfAccount,
                            sumOfAccount:req.body.sumOfAccount,
                            paymentAppointment: req.body.paymentAppointment,
                            valueAddedTax:req.body.valueAddedTax,
                            typeOfExpense: req.body.typeOfExpense,
                            seller: {name: req.body.seller.name, inn:req.body.seller.inn }
                        },
                        cashlessExpenditures: req.body
                    }
                 

                }
            )
             .then(result => {
                res.status(200).json({ message: "MaterialCosts and CashlessExpenditures updated successfully"}) 
            })
    }

    /* Расходы на ГСМ */
    if(itemOfExpenditure === 'ГСМ'){
            ConstructionSite.updateOne(
                {_id: req.params._id},
                {
                    $push:{
                        "itemsOfExpenditures.petrolOilLubricantsCosts": {
                            accountNumber: req.body.accountNumber,
                            dateOfAccount:req.body.dateOfAccount,
                            sumOfAccount:req.body.sumOfAccount,
                            paymentAppointment: req.body.paymentAppointment,
                            valueAddedTax:req.body.valueAddedTax,
                            typeOfExpense: req.body.typeOfExpense,
                            seller: {name: req.body.seller.name, inn:req.body.seller.inn }
                        },
                        cashlessExpenditures: req.body
                    }
                 

                }
            )
             .then(result => {
                res.status(200).json({ message: "petrolOilLubricantsCosts and CashlessExpenditures updated successfully"}) 
            })
    }

    /* Прочие расходы */
    if(itemOfExpenditure === 'Прочее'){
            ConstructionSite.updateOne(
                {_id: req.params._id},
                {
                    $push:{
                        "itemsOfExpenditures.otherCosts": {
                            accountNumber: req.body.accountNumber,
                            dateOfAccount:req.body.dateOfAccount,
                            sumOfAccount:req.body.sumOfAccount,
                            paymentAppointment: req.body.paymentAppointment,
                            valueAddedTax:req.body.valueAddedTax,
                            typeOfExpense: req.body.typeOfExpense,
                            seller: {name: req.body.seller.name, inn:req.body.seller.inn }
                        },
                        cashlessExpenditures: req.body
                    }
                 

                }
            )
             .then(result => {
                res.status(200).json({ message: "otherCosts and CashlessExpenditures updated successfully"}) 
            })
    }

})



router.patch("/add-cash-expenditure/:_id", checkAuth, (req, res, next)=> {
    const itemOfExpenditure = req.body.itemOfExpenditure

    /* Расходы на материалы */
    if(itemOfExpenditure === 'Материалы'){
            ConstructionSite.updateOne(
                {_id: req.params._id},
                {
                    $push:{
                        "itemsOfExpenditures.materialCosts": {
                            accountNumber: req.body.accountNumber,
                            dateOfAccount:req.body.dateOfAccount,
                            sumOfAccount:req.body.sumOfAccount,
                            paymentAppointment: req.body.paymentAppointment,
                            valueAddedTax:req.body.valueAddedTax,
                            typeOfExpense: req.body.typeOfExpense,
                            seller: {name: req.body.seller.name, inn:req.body.seller.inn }
                        },
                        cashExpenditures: req.body
                    }
                 

                }
            )
             .then(result => {
                res.status(200).json({ message: "MaterialCosts and CashExpenditures updated successfully"}) 
            })
    }

    /* Расходы на ГСМ */
    if(itemOfExpenditure === 'ГСМ'){
            ConstructionSite.updateOne(
                {_id: req.params._id},
                {
                    $push:{
                        "itemsOfExpenditures.petrolOilLubricantsCosts": {
                            accountNumber: req.body.accountNumber,
                            dateOfAccount:req.body.dateOfAccount,
                            sumOfAccount:req.body.sumOfAccount,
                            paymentAppointment: req.body.paymentAppointment,
                            valueAddedTax:req.body.valueAddedTax,
                            typeOfExpense: req.body.typeOfExpense,
                            seller: {name: req.body.seller.name, inn:req.body.seller.inn }
                        },
                        cashExpenditures: req.body
                    }
                 

                }
            )
             .then(result => {
                res.status(200).json({ message: "petrolOilLubricantsCosts and CashExpenditures updated successfully"}) 
            })
    }

    /* Прочие расходы */
    if(itemOfExpenditure === 'Прочее'){
            ConstructionSite.updateOne(
                {_id: req.params._id},
                {
                    $push:{
                        "itemsOfExpenditures.otherCosts": {
                            accountNumber: req.body.accountNumber,
                            dateOfAccount:req.body.dateOfAccount,
                            sumOfAccount:req.body.sumOfAccount,
                            paymentAppointment: req.body.paymentAppointment,
                            valueAddedTax:req.body.valueAddedTax,
                            typeOfExpense: req.body.typeOfExpense,
                            seller: {name: req.body.seller.name, inn:req.body.seller.inn }
                        },
                        cashExpenditures: req.body
                    }
                }
            )
             .then(result => {
                res.status(200).json({ message: "otherCosts and CashExpenditures updated successfully"}) 
            })
    }

})



router.patch("/add-duty-expenditure/:_id", checkAuth, (req, res, next)=> {
   
    const itemOfExpenditure = req.body.itemOfExpenditure

    /* Расходы на материалы */
    if(itemOfExpenditure === 'Материалы'){
            ConstructionSite.updateOne(
                {_id: req.params._id},
                {
                    $push:{
                        "itemsOfExpenditures.materialCosts": {
                            accountNumber: req.body.accountNumber,
                            dateOfAccount:req.body.dateOfAccount,
                            sumOfAccount:req.body.sumOfAccount,
                            paymentAppointment: req.body.paymentAppointment,
                
                            typeOfExpense: req.body.typeOfExpense,
                    
                        },
                        dutyExpenditures: req.body
                    }
                 

                }
            )
             .then(result => {
                res.status(200).json({ message: "MaterialCosts and DutyExpenditures updated successfully"}) 
            })
    }

    /* Расходы на ГСМ */
    if(itemOfExpenditure === 'ГСМ'){
            ConstructionSite.updateOne(
                {_id: req.params._id},
                {
                    $push:{
                        "itemsOfExpenditures.petrolOilLubricantsCosts": {
                            accountNumber: req.body.accountNumber,
                            dateOfAccount:req.body.dateOfAccount,
                            sumOfAccount:req.body.sumOfAccount,
                            paymentAppointment: req.body.paymentAppointment,
                         
                            typeOfExpense: req.body.typeOfExpense,
                          
                        },
                        dutyExpenditures: req.body
                    }
                 

                }
            )
             .then(result => {
                res.status(200).json({ message: "petrolOilLubricantsCosts and DutyExpenditures updated successfully"}) 
            })
    }

    /* Прочие расходы */
    if(itemOfExpenditure === 'Прочее'){
            ConstructionSite.updateOne(
                {_id: req.params._id},
                {
                    $push:{
                        "itemsOfExpenditures.otherCosts": {
                            accountNumber: req.body.accountNumber,
                            dateOfAccount:req.body.dateOfAccount,
                            sumOfAccount:req.body.sumOfAccount,
                            paymentAppointment: req.body.paymentAppointment,
                           
                            typeOfExpense: req.body.typeOfExpense,
                          
                        },
                        dutyExpenditures: req.body
                    }
                }
            )
             .then(result => {
                res.status(200).json({ message: "otherCosts and DutyExpenditures updated successfully"}) 
            })
    }

    })




/*** Добавление нового исполнителя ***/
 router.patch("/new-contractors/:_id", checkAuth, multer({storage: storage}).array('docsFiles[]', 5) ,(req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
  const docsPaths = req.files.map(file => {
            return url + "/uploads/" + file.filename
    })
    
     req.body.docsPaths = docsPaths

       ConstructionSite.updateOne(
        {_id: req.params._id},
        {
            $push: {
                 contractors: req.body
            } 
        }
     ).then(result => {
         res.status(200).json({ 
             message: "Contractors updated successfully",
             docsPaths: docsPaths
        })
     })
 })


 
 


module.exports = router;