const express = require('express')
const app = express()
const Pool = require('pg').Pool;
const port = 3000

let pool = new Pool({
    host: 'localhost',
    database: 'endpoint',
    user: 'ariftes',
    password: '123456',
    port:5432,

});

const logger = function(req,res,next){
    console.log(`${req.method} ${req.url} ${res.statusCode}`)
    next()
  }

app.use(logger)
app.use(express.json())

app.get('/customers', (req,res,next)=>{
    try{
        async function getData(){
            let customers = await pool.query(`SELECT * FROM customers`)
            // console.log(customers.rows)
            res.json(customers.rows)
        }
        getData()
    }catch(err){
        next(err)
    }
})

app.get('/customers/:id', (req,res,next) => {
    try{
        let id = req.params.id
        async function getData(id){
            let customers = await pool.query(`SELECT * FROM customers WHERE id=${id}`)
            // console.log(customers.rows)
            res.json(customers.rows)
        }
        getData(id)
    }catch(err){
        next(err)
    } 
})

app.post('/customers', (req,res,next)=>{
    try{
        // console.log(req.body)
        async function postData(name,email,phone_number,is_active){
            let customers = await pool.query(`INSERT INTO customers (name,email,phone_number,is_active) VALUES ('${String(name)}','${String(email)}','${String(phone_number)}',${is_active});`)
            // console.log(customers)
            res.json('Sukses input data!')
        }        
        postData(req.body.name,req.body.email,req.body.phone_number,req.body.is_active)
    }catch(err){
        next(err)
    }
})

app.put('/customers/:id', (req,res,next)=>{
    try{
        let id = req.params.id
        // console.log(req.body)
        async function updateData(id,name,email,phone_number,is_active){
            let customers = await pool.query(`UPDATE customers SET name = '${name}', email = '${email}', phone_number = '${phone_number}', is_active = ${is_active} WHERE id = ${id}`)
            // console.log(customers)
            res.json('Sukses update data!')
        }        
        updateData(id,req.body.name,req.body.email,req.body.phone_number,req.body.is_active)
    }catch(err){
        next(err)
    }
})

app.delete('/customers/:id', (req,res,next)=>{
    try{
        let id = req.params.id
        // console.log(req.body)
        async function deleteData(id){
            let customers = await pool.query(`DELETE FROM customers WHERE id = ${id}`)
            // console.log(customers)
            res.json('Sukses delete data!')
        }        
        deleteData(id)
    }catch(err){
        next(err)
    }
})


app.use((err,req,res,next)=>{
    console.log(err.message);
    res.status(400).json({ err: err.message})
  })

app.listen(port, () => {
    console.log(`Listening to port : ${port}`)
  })