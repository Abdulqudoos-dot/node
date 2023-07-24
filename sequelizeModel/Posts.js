module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('post', {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'no_photo'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'posts',
    })
    return Post
}