const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    next();
})


app.post("/api/construction-sites", (req, res, next) => {
   const constructionSites = req.body;
   console.log(constructionSites)
   res.status(201).json({message: "Post was added successfully"})
})

app.get('/api/construction-sites', (req, res, next) => {
    const constructionSites = [
        {
            id: '23fhdj232',
            nameOfConstructionSite: 'Кабинет географии',
            customer: 'Школа № 23',
            valueOfContract: 231758,
            deadline: new Date(),
            planningExpenditures: {
                materialCosts: 234,
                wageFundDeductions: 54,
                petrolOilLubricantsCosts: 134,
                otherCosts: 385,
                proposalSecurity: 134 ,
                contractSecurity: 768,
                bankGuarantee: 780,
                sumOfCosts: 25755
            } 
        },
        {
            id: '23fhdj232',
            nameOfConstructionSite: 'Кабинет истории',
            customer: 'Школа № 11',
            valueOfContract: 56709,
            deadline: new Date(),
            planningExpenditures: {
                materialCosts: 234,
                wageFundDeductions: 54,
                petrolOilLubricantsCosts: 134,
                otherCosts: 385,
                proposalSecurity: 134 ,
                contractSecurity: 768,
                bankGuarantee: 780,
                sumOfCosts: 25755
            }
        }
    ]
    res.status(200).json({
        message: 'Construction sites fetched successfully',
        constructionSites
    })
});

module.exports = app;

