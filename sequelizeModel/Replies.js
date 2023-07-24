module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define('reply', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        tableName: 'replies',
    })
    return Reply
}