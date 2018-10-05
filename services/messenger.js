let request = require('request');
const getLines = require('./lines');


function trataMessage(event) {
    var senderId = event.sender.id;
    var recipientId = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    var messageId = message.mid;
    var messageText = message.text;
    var files = message.attachments;


    if (messageText) {

        switch (messageText) {
            case 'oi':
                sendTextMessage(senderId, messageText);
                break;
            case 'status':
                sendFirstMenu(senderId);
                break;
            default:
                sendTextMessage(senderId, 'Não entendi.');
                break;
        }
    } else if (files) {
        sendTextMessage(senderId, "Send more attachments.");
    }
}

function sendFirstMenu(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "Qual linha você procura?",
                    buttons: [
                        // {
                        //   type:"web_url",
                        //   url: "https://www.messenger.com",
                        //   title:"Visit Messenger"
                        // },
                        {
                            type: 'postback',
                            title: 'Amarela',
                            payload: '-Amarela'
                        },
                        {
                            type: 'postback',
                            title: 'Azul',
                            payload: '-Azul'
                        },
                        {
                            type: 'postback',
                            title: 'Verde',
                            payload: '-Verde'
                        },
                        {
                            type: 'postback',
                            title: 'Lilás',
                            payload: '-Lilás'
                        },
                    ]
                }
            }
        }
    };

    this.callSendApi(messageData);
}

function callSendApi(messageData) {
    request({
        url: 'https://graph.facebook.com/v2.12/me/messages',
        qs: {
            access_token: 'EAAEsz1ZCVCckBAN7EZBjfz2b12OcVIVczMI2At7ZBeDq3kgzPqVB0Y1QKQ9ucGYymx5R9lnkKAaTYrcrN5nD0iU1SYiNr2c7q4qyxyFsTy4ZCsPEO11ZBxNlyOb2HKqZCg2ZAkOLwrkYsUeb6ZC9YrGh86WBYiswsYoOJF0Xl4Io9dj0Tt8hmiTV'
        },
        method: 'POST',
        json: messageData,
    }, function (err, res, body) {

        if (err) {
            console.log(err);
        } else if (res.statusCode == 200) {
            console.log(`Message sended. to ${body.recipient_id}`);
            var recipientId = body.recipient_id;
            var messageId = body.message_id;
        }
    });

}

exports.sendMenuCptm = (recipientId) => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "CPTM",
                    buttons: [{
                        type: "web_url",
                        url: "http://www.cptm.sp.gov.br/Pages/Home.aspx#destaques",
                        title: "Acesse o site da CPTM."
                    }]
                }
            }
        }
    };

    callSendApi(messageData);
}

exports.sendTextMessage = async (recipientId, messageText) => {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };

    callSendApi(messageData);
}

exports.sendStatusLine = async (payload) => {
    var text = 'erro';
    var retorno = await getLines();

    var line = '';

    retorno.StatusMetro.ListLineStatus.forEach(function (v, i) {
        line = v.Color;

        if (payload == line) {
            text = `Status da linha ${v.Line}: ${v.StatusMetro}`;

            if (v.Status == 0) text += ' :) ';
            else text += ' :( ';

            if (v.Description) {
                text += `\n\n${v.Description}`;
            }


            text += `\nHorário: ${retorno.StatusMetro.DateUpdateMetro}`;

        }
    });

    return text;

}

exports.sendStatusLineYellow = async () => {
    var text = 'erro';
    
    const yellow = await getLines();

    if (yellow.CurrentLineStatus) {
        text = 'Linha 4 - Amarela\n\n'
        text += `Status: ${yellow.CurrentLineStatus.Status} :)\n`;

        if (yellow.CurrentLineStatus.Description) {
            text += `Descrição: ${yellow.CurrentLineStatus.Description}\n\n`;
        }

        text += `Horário: ${yellow.CurrentLineStatus.DateUpdateFormated}`;
    } else
        text = 'Erro ao consultar status da linha 4 - amarela :(';

    return text;
}