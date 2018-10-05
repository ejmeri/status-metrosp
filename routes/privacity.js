var router = require('express').Router();


router.get('/', (req, res) => {
    res.send('O Metro Fácil não faz uso de nenhum de seus dados, operamos apenas como software livre com o intuito em aprender novas tecnologias!');
});


module.exports = app => app.use('/privacity/', router);