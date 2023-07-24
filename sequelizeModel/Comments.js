module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        tableName: 'comments',
    })
    return Comment
}