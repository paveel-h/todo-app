// bringing required packages 
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); 

// connection to MySQL database
const db = mysql.createConnection({
    host: "db",
    user: "pavel",
    password: "password",
    database: "tododatabase"
});

// express app
const app = express();

// port for backend express app
const port = process.env.PORT || 3000; 

// using cors and express json 
app.use(cors());
app.use(express.json());

// establishing connection to database and creating backend server 
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL!");
    app.listen(port, () => {
    console.log('Backend app listening on port ' + port);
    });
});


app.get('/gettask', (request,response) => {
    // get data from database 
    let sql = 'SELECT * FROM tasktable'; 
    db.query(sql, (err,result) => {
        if (err) throw err; 
        console.log(result);
        console.log(typeof result);
        response.send(result)
    });
});  

app.get('/getcompletedtask', (request,response) => {
    // get data from database 
    let sql = 'SELECT * FROM donetasks'; 
    db.query(sql, (err,result) => {
        if (err) throw err; 
        console.log(result);
        console.log(typeof result);
        response.send(result)
    });
});

app.post('/task', (request,response) => {
    console.log(request.body);
    console.log(typeof (JSON.stringify(request.body)));
    // sending data to database...
    
    //let sql ='INSERT INTO tasktable VALUES(?)';
    let sql = 'INSERT INTO tasktable SET ?';
    db.query(sql, request.body , (err, result) => {
        if (err) throw err; 
        console.log("Data send to database...");
    });
    
});  

app.post('/complete', (request,response) => {
    console.log(request.body);
    //let sql ='INSERT INTO tasktable VALUES(?)';
    let sql = 'INSERT INTO donetasks SET ?';
    db.query(sql, request.body , (err, result) => {
        if (err) throw err; 
        console.log("Data send to database...");
    });
});  

app.delete('/delete/:id', (request,response) => {
    const sql = `DELETE FROM tasktable WHERE id = ${request.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err; 
        console.log("Data deleted...");
    });
});



app.delete('/deleteCompleted/:id', (request,response) => {
    const sql = `DELETE FROM donetasks WHERE id = ${request.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err; 
        console.log("Data deleted...");
    });
});









