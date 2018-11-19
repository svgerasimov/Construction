const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path')

const constructionSitesRoutes = require('./routes/construction-sites')
const authRoutes = require('./routes/auth')

const app = express();

mongoose.connect("mongodb+srv://svyatoslav:5fB0brBwE0G15bz4@cluster0-vzgys.mongodb.net/construction")
    .then(() => {
        console.log('Connected to DataBase')
    })
    .catch(()=> {
        console.log('Connection failed')
    })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/uploads", express.static(path.join("backend/uploads")))

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    next();
})



app.use("/api/construction-sites", constructionSitesRoutes)
app.use("/api/construction-sites", authRoutes)



module.exports = app;

