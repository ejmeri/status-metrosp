module.exports = function (sequelize, DataTypes) {
    return sequelize.define("LineUser", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT
        },
        line_id: {
            type: DataTypes.BIGINT
        }
    });
};