require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const ctrl = require('./controller');

const {SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env;

const app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}))

massive({
    connectionString = CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then((db) => {
    app.set('db', db)
    console.log("Database jacked up and good to go!")
}).catch(err => console.log("Database error: " + err))

// User Endpoints:
app.post('/api/login', ctrl.login);
app.put('/api/user', ctrl.editUser);
app.post('/api/register', ctrl.register);
app.delete('/api/logout', ctrl.logout);

// Content Endpoints:

app.listen(SERVER_PORT, () => console.log(`Server reporting for duty on port ${SERVER_PORT}, judicator`));