module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Line", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        number: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    });
};