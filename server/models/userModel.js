module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
        },
        gmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pass: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.BLOB('long'),
        },
        bdate: {
            type: DataTypes.DATE,
        },
    }, {
        freezeTableName: true,
    });
    return User;
};
