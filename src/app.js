const express = require('express');
const { authController, userController } = require('./controllers');
const { validateProUser } = require('./midd/validationPropUser');

// ...

const app = express();

app.use(express.json());

app.post('/login', validateProUser, authController.login);
app.post('/user', userController.insertUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
