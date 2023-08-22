module.exports = (sequelize, DataTypes) => {
    const Enrollment = sequelize.define('enrollment', {
        EnrollmentID: {
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
        EnrollmentDate: {
            type: DataTypes.DATE,
        },
    }, {
        tableName: 'enrollment', // Name of the table in the database
        timestamps: true, // This will add 'createdAt' and 'updatedAt' columns
    });

    Enrollment.associate = (models) => {
        Enrollment.belongsTo(models.user, { foreignKey: 'StudentID', as: 'student' });
        Enrollment.belongsTo(models.course, { foreignKey: 'CourseID', as: 'course' });
    };
    return Enrollment;
};
