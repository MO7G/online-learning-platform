module.exports = (sequelize, DataTypes) => {
    const Interaction = sequelize.define('interaction', {
        InteractionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CourseID: {
            type: DataTypes.INTEGER,
        },
        StudentID: {
            type: DataTypes.INTEGER,
        },
        videoid: {
            type: DataTypes.INTEGER,
        },
        comment: {
            type: DataTypes.STRING,
        },
        like: {
            type: DataTypes.BOOLEAN,
        },
        InteractionDate: {
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'interaction', // Name of the table in the database
        timestamps: true, // This will add 'createdAt' and 'updatedAt' columns
    });

    Interaction.associate = (models) => {
        Interaction.belongsTo(models.user, { foreignKey: 'StudentID', as: 'student' });
        Interaction.belongsTo(models.video, { foreignKey: 'videoid', as: 'video' });
        Interaction.belongsTo(models.course, { foreignKey: 'CourseID', as: 'course' });
    };
    return Interaction;
};
