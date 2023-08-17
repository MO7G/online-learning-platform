module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('courses', {
        courseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        courseName: {
            type: DataTypes.STRING,
        },
        courseDescription: {
            type: DataTypes.STRING,
        },
        coursedate: {
            type: DataTypes.DATE,
        },
        numberofVideos: {
            type: DataTypes.INTEGER,
        },
        TeacherID: {
            type: DataTypes.INTEGER,
        },
        courseImage: {
            type: DataTypes.BLOB('long'),
        },
    }, {
        freezeTableName: true
    });

    Course.associate = (models) => {
        Course.hasMany(models.video, { foreignKey: 'courseId', as: 'videos' });
    };

    return Course;
};
