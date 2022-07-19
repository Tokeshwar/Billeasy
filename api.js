const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log("Sever running on port 3000");
})

client.connect();

/*************************Add a new employee***************************/

app.post('/employees', (req, res) => {
    const employee = req.body;
    let insertQuery = `insert into employees(id, firstname, lastname, department) 
                       values(${employee.id}, '${employee.firstname}', '${employee.lastname}', '${employee.department}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

/**************************All employees details************************/

app.get('/employees', (req, res) => {
    client.query(`Select * from employees`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})
