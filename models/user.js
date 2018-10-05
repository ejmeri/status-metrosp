module.exports = function (sequelize, DataTypes) {
    return sequelize.define("User", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    });
};