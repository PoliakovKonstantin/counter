//const formData = require("express-form-data")
const express=require('express')
const app=express()
var ejs=require('ejs')
const upload=require('./routs/multer-test')
const fs=require('fs')
let router=require('./routs/api.js')
app.use('/api',router)//app.use(formData.parse());
app.set('view engine', 'ejs')
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});