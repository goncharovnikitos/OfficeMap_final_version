import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';

import {serverPort} from './config.json';

import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// используем bodyParser для преобразования полученных данных в json-формат
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());

// будем использовать сессии с параметрами
app.use(session({
    secret: 'secret keyword', // секретная фраза
    cookie: {} // набор данных по умолчанию
}));

// разрешаем использование запросов к этому серверу с любых адресов
app.use(cors());

app.get('/users', (req, res) => {
    db.listUsers().then(data => res.send(data));
});

app.get('/get-login', (req, res) => {
   res.send(session.user_id || 'guest');
});

app.get('/find-user/:id', (req, res) => {
    db.findUserByID(req.params.id).then(data => res.send(data));
});

app.post('/new-user/', (req, res) => {
    // производим проверку данных пользователя перед созданием
    const body_data = req.body;
    let validate = db.validateUser(body_data);
    // если есть ошибки - вернем их ответом
    if (validate !== true){
        res.send(validate);
        return;
    }
    // иначе продолжаем создание пользователя
    db.createUser(body_data).then(function(data) {
        // для создания используем функцию replace, поэтому данные пользователя запрашиваем отдельно
        db.findUserByLogin(body_data.login).then(function(data) {
            let user_id = (data && data._id) ? data._id : null;
            session.user_id = user_id;
            res.send(user_id ? 'ok' : 'error');
        });
    });
});

app.get('/logout', (req, res) => {
    session.user_id = 'guest';
    res.send('ok');
});

app.post('/login', (req, res) => {
    db.loginUser(req.body.login, req.body.password).then(function(data) {
        // console.log(data);
        let user_id = (data && data._id) ? data._id : null;
        session.user_id = user_id;
        res.send(user_id ? 'ok' : 'Пользователь не найден');
        // res.send(data);
    });
});

/*app.post('/findLocation', (req, res)) => { 
    db.find(req._id).then(data => res.send())
} не понятно */

/*app.delete('/User/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});*/

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});
