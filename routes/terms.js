var router = require('express').Router();


router.get('/', (req, res) => {
    res.send('Termos de serviços livres');
});


module.exports = app => app.use('/terms/', router);