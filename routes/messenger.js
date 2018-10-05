require('dotenv').config()

var router = require('express').Router();

var Messenger = require('../services/messenger');

router.get('/', (req, res) => {
    res.send('Olá Mundo!');
});

router.get('/webhook', function (req, res) {
    if (req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == process.env.VERIFY_TOKEN) {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.status(403).send();
    }
});

router.post('/webhook', async function (req, res) {
    var text = 'Erro';

    var data = req.body;
    
    if (data && data.object == 'page') {
        data.entry.forEach(function (entry) {
            var pageId = entry.id;
            var timeOfevent = entry.time;

            // percorrer todas as mensagens
            entry.messaging.forEach(async function (event) {

                if (event.message) {
                    trataMessage(event);
                } else {
                    if (event.postback && event.postback.payload) {



                        var payload = event.postback.payload;

                        if (payload == 'GET_STARTED_PAYLOAD')
                            Messenger.sendTextMessage(event.sender.id, 'Olá, tudo bem? Para ver o status de alguma linha utilize o menu :D');
                        else if (payload == 'HELP_PAYLOAD')
                            Messenger.sendTextMessage(event.sender.id, 'Olá, sou o Metro Fácil :)\n\nPara ver o status de alguma linha utitlize o menu :D');
                        else {
                            if (payload == 'Lilas')
                                payload = payload.replace('a', 'á');

                            if (payload == 'Amarela')
                                text = await Messenger.sendStatusLineYellow();
                            else if (payload == 'cptm') {
                                Messenger.sendMenuCptm(event.sender.id);
                                text = 'Em breve, teremos status com as linhas da CPTM :)'
                            } else
                                text = await Messenger.sendStatusLine(payload);

                            await Messenger.sendTextMessage(event.sender.id, text);

                        }

                    } else {
                        return;
                    }
                }
            });
        });

        res.status(200).send();
    }

});

module.exports = app => app.use('/messenger/', router);