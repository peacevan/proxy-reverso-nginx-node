const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'dbProxyReverso'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)


const createTablePeople = `create table IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`
connection.query(createTablePeople)
const sql = `INSERT INTO people(name) values('Ivan Amado')`
connection.query(sql)
connection.end()

app.get('/', (req, resp) => {
    const connection = mysql.createConnection(config)
  
    connection.query('SELECT name FROM people', (err, rows, fields) => {
      if (!err) {
        var names = "";
        rows.forEach(row => {
          names = names + `<li>${row.name}</li>`
        })
  
        resp.send(`<h1>Full Cycle Rocks!</h1><br>
                   <ul>` + names + `</ul>`
        )
      } else {
        console.log(err);
      }
    });
    connection.end()
        
  })

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})