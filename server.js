const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    // host: 'localhost', // 'localhost'
    // user: 'root',
    // password: 'root',
    // database:'my_database'
    host: 'sql12.freesqldatabase.com', // 'external database'
    user: 'sql12712369',
    password: 'eYlZuGDIWK',
    database:'sql12712369',
    port:'3306'
});

db.connect((err) => {
    if (err) 
    {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) 
        {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }

        if (results.length > 0) 
        {
            console.log(results,
                "--------------->"
            );
            res.status(200).send('Login successful');
        } 
        else 
        {
            res.status(401).send('Invalid username or password');
        }
    });
});

app.post('/api/signup', (req, res) => {
    const { newusername, newpassword, newemail } = req.body;
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(query, [newusername, newpassword, newemail], (err, results) => {
        if (err) {
            console.error("An error executing query", err);
            res.status(500).send('Server error');
            return;
        }
        if (results.affectedRows > 0) {
            res.status(200).send('User created successfully');
        } else {
            res.status(409).send('User already exists');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
