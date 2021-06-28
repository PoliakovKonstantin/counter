const express=require('express')
const redis=require('redis')
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const app=express()
const STORAGE_URL=process.env.STORAGE_URL || 'localhost'
const client=redis.createClient(`redis://${STORAGE_URL}`)
const fs=require('fs')
const router=express.Router()
const upload=require('./multer-test')
let arr1=[]
class book{
    constructor(title,description,authors,favorite,fileCover,fileName,fileBook){  
    this.id=arr.length+1
    this.title= title,
    this.description= description,
    this.authors= authors,
    this.favorite= favorite,
    this.fileCover=fileCover,
    this.fileName=fileName,
    this.fileBook=fileBook
    this.views=0
  }}
let arr=[]
let book1=new book(1,2,3,4,5,6,7)
//let id=book1.id 
app.set('view engine', 'ejs')
arr.push(book1)
let book2=new book(8,9,5,576,45,634,634)
arr.push(book2)
//console.log(book1.id)

router.use((req,res,next) => {
    console.log('Node js Middleware express.Router()');   
    next()
})
router.post('/user/login',(req,res)=>{
    res.send('{ id: 1, mail: "test@mail.ru" }').statusCode=201
}
)

router.get('/books',(req,res)=>{
    res.render('index',{
        arr: arr
    })
})

router.get('/books/:id', (req, res) => {

    let {id} = req.params;
    const idx=arr.findIndex(el=>el.id==id)
    client.incr(id,(err,rep)=>{
        if(err) {
            res.status(500).send(err)
            console.log(err)
        }else {
            console.log(id+' updated to '+rep)
            arr[idx].views=rep
            if(idx==-1) {
                res.status(404).render("404",{});   
            }
            
            else{
                console.log('Hi!')
                res.render('view',{
                    arr:arr,
                    id:idx,
                    views:rep
                })
            }
        }        //работает-не трогать!!!
    })
    //id=parseInt(id)
    console.log(arr)
    
    //res.status(404)
    //console.log(idx)
    
})
router.post('/books',upload.single('fileBook'),urlencodedParser,(req,res)=>{
    res.render('create',{
        arr:arr,
        book:book})
    const {title,description,authors,favorite,fileCover,fileName,fileBook} = req.body
    const abc=new book(title,description,authors,favorite,fileCover,fileName,fileBook)
    if(upload.single) {
        abc.fileBook='True'
    }
    else {
        abc.fileBook='False'
    }
    arr.push(abc)
    //res.send(abc)   
    console.log(arr)
})
router.post('/books/:id',urlencodedParser,(req,res)=>{

    const {id}=req.params
    const idx = arr.findIndex(el => el.id == id);

    if (idx!=-1) {
        res.render('update',{
            arr:arr,
            id:idx,
            book:book
        })
            console.log('Ваш запрос попал в обработчик')
            console.log(req.body)
            const {title,description,authors,favorite,fileCover,fileName,fileBook} = req.body
            arr.pop(idx)
            arr[idx]=new book(title,description,authors,favorite,fileCover,fileName,fileBook)
            console.log('Ваш запрос успешно обработан')
            console.log(arr,req.body)
        
        //res.send(arr[idx])
    }
    else {
        res.render('404',{})
    } 
})
router.put('/books/:id',upload.single('fileBook'),(req,res)=>{
    const {id}=req.params
    const idx = arr.findIndex(el => el.id == id);
    if (idx!=-1) {
        const {title,description,authors,favorite,fileCover,fileName,fileBook} = req.body
        
        arr.pop(idx)
        arr[idx]=new book(title,description,authors,favorite,fileCover,fileName,fileBook)
        res.send(arr[idx])
    }
    else {
        res.status(404).send('not found')
    } 
    //module.exports={router,arr,idx}
})
router.delete('/books/:id', (req, res) => {
    const {id} = req.params;
    const idx = arr.findIndex(el => el.id === id);                                                                            
    if (idx!==-1) {
        arr.splice(idx,1,)
        res.send('ok')
    }
    else{
       res.status(404).send('not found')
    }
    //module.exports={router,arr,idx}
});
router.get('/books/:id/download',(req,res) =>{
    let {id}=req.params
    const idx = arr.findIndex(el => el.id == id);
    if (idx!=-1) {
        fs.writeFile('qwer.txt',Object.entries(arr[idx]).map(([k,v])=>`${k}: ${v}`).join(', '),(err)=>console.log(err))
        fs.routerendFileSync('qwer.txt','Привет!')
        res.download(__dirname+'C:\Nodejs\date.js','qwertyuiop1',(err)=>console.log(err)).send('ok')
    }
    else{
        res.status(404).send('not found')
    }
    //module.exports={router,arr,idx}
})
console.log(client.id)
module.exports=router