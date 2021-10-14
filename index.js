const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userController = require('./controllers/userController');
const errorMiddleware = require('./middlewares/error');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userController);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
