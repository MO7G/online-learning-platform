module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('video', {
        videoId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        videoName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        videoLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        videoDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        likes_counter: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        image: {
            type: DataTypes.BLOB('long'),
        },
    }, {
        tableName: 'videos', // Name of the table in the database

    });


    Video.associate = (models) => {
        Video.belongsTo(models.course, { foreignKey: 'courseId', as: 'course' });
    };

    return Video;
};
