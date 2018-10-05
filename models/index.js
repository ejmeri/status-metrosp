const database = require('../config/mysql');

if(!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize'),
    sequelize = null
    
    sequelize = new Sequelize(database.database, database.username, database.password, database.params);

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,


        User: sequelize.import(__dirname + '/user'),
        Line: sequelize.import(__dirname + '/line'),
        LineUser: sequelize.import(__dirname + '/lineuser')
    }

    global.db.User.hasMany(global.db.LineUser);
    global.db.Line.hasMany(global.db.LineUser);
   
    
}


module.exports = global.db;