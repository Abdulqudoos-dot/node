const { Sequelize, DataTypes } = require('sequelize')

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('devcamper', 'root', 'A03062404012z///+++///', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

try {
    sequelize.authenticate()
    console.log("Connection has been established successfully".bgBlue)
} catch (error) {
    console.log("Unable to connect to datbase", error)
}
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.bootCamp = require('./Bootcamps')(sequelize, DataTypes)
db.user = require('./Users')(sequelize, DataTypes)
db.post = require('./Posts')(sequelize, DataTypes)
db.comment = require('./Comments')(sequelize, DataTypes)
db.reply = require('./Replies')(sequelize, DataTypes)

db.user.hasMany(db.post);
db.post.belongsTo(db.user);


db.post.belongsToMany(db.comment, { through: 'PostComment', as: 'comments', foreignKey: 'postId' });
db.comment.belongsToMany(db.post, { through: 'PostComment', as: 'posts', foreignKey: 'commentId' });
db.comment.belongsToMany(db.reply, { through: 'CommentReply', as: 'replies', foreignKey: 'commentId' });
db.reply.belongsToMany(db.comment, { through: 'CommentReply', as: 'comments', foreignKey: 'replyId' });


db.sequelize.sync({
    force: false
})


module.exports = db