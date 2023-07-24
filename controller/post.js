const path = require("path")
const asyncHandler = require("../middleware/async");
const Post = require('../sequelizeModel').post
const Comment = require('../sequelizeModel').comment
const Reply = require('../sequelizeModel').reply


const ErrorResponse = require("../util/errorResponse");


// @desc     get all posts
// @route   /api/v1/posts
// @access   public
// modified with sequelize


exports.getPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.findAll({})
    res.status(200).json({ success: true, data: posts });
})


// @desc     get one post
// @route   /api/v1/posts/:id
// @access   public
// modified with sequelize
exports.getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findByPk(req.params.id)
    if (!post) {
        return next(
            new ErrorResponse(`post not found with the id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: post });
})

// @desc     creat post
// @route   /api/v1/posts
// @access   private
// modified with sequelize
exports.creatPost = asyncHandler(async (req, res, next) => {
    console.log(req.user)
    req.body.userId = req.user.id
    const createdPost = await Post.create(req.body)
    res.status(201).json({ success: true, data: createdPost });
})



// @desc     upload photo in post
// @ route   /api/v1/posts/:id/photo
// @access   private

exports.uploadPostPhoto = asyncHandler(async (req, res, next) => {

    const post = await Post.findByPk(req.params.id)

    if (!post) {
        return next(
            new ErrorResponse(`post not found with the id of ${req.params.id}`, 404))
    }
    // && req.user.role !== 'admin'
    if (post.userId !== req.user.id) {
        return next(
            new ErrorResponse(`the user with id ${req.user.id} is not authorized to update the bootcamp`, 401))
    }

    if (!req.files) {
        return next(
            new ErrorResponse(`Please Upload a file`, 400))
    }

    const file = req.files.undefined
    if (!file.mimetype.startsWith("image")) {
        return next(
            new ErrorResponse(`Please Upload an image`, 400))

    }
    if (file.size > process.env.FILE_UPLOAD_MAX_SIZE) {
        return next(
            new ErrorResponse(`Please Upload an image with less than ${FILE_UPLOAD_MAX_SIZE} size`, 400))
    }
    file.name = `photo${post.id}${path.parse(file.name).ext}`

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.log(err)
            return next(
                new ErrorResponse(`Problem with file upload`, 500))

        }
    })
    await post.update({ photo: file.name }, {
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ success: true, data: file.name });

})




// @desc     comment on post
// @route   /api/v1/posts/postId/comments
// @access   private
// modified with sequelize
exports.commentOnPost = asyncHandler(async (req, res, next) => {

    const post = await Post.findByPk(req.params.postId)

    if (!post) {
        return next(
            new ErrorResponse(`post not found with the id of ${req.params.postId}`, 404))
    }
    // && req.user.role !== 'admin'
    if (post.userId !== req.user.id) {
        return next(
            new ErrorResponse(`the user with id ${req.user.id} is not authorized to update the post`, 401))
    }

    // make comment 
    const comment = await Comment.create(req.body)
    // await comment.addUser(user);
    await comment.addPost(post);
    res.status(201).json({ success: true, data: comment });
})


// @desc    get comment on post
// @route   /api/v1/posts/postId/comments
// @access   public
// modified with sequelize
exports.getCommentOnPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findByPk(req.params.postId)
    if (!post) {
        return next(
            new ErrorResponse(`post not found with the id of ${req.params.postId}`, 404))
    }
    // make comment 
    const posts = await Post.findAll({
        where: { id: req.params.postId },
        include: [
            {
                model: Comment,
                as: 'comments',
                // where: { id: post.id }, // Only include the post with the specific postId
                attributes: ['text'], // Define which post attributes to include
                through: { attributes: [] },
                include: [
                    {
                        model: Reply,
                        as: 'replies',
                        // where: { id: post.id }, // Only include the post with the specific postId
                        attributes: ['content'], // Define which post attributes to include
                        through: { attributes: [] },

                    },
                ],
            },
        ],
        attributes: ['title', 'content'],
        through: { attributes: [] },
    });
    res.status(201).json({ success: true, data: posts });
})


// @desc    reply on  comment
// @route   /api/v1/comments/:commentId/reply
// @access   public
// modified with sequelize

exports.replyOnComment = asyncHandler(async (req, res, next) => {
    let comment = await Comment.findByPk(req.params.commentId)
    if (!comment) {
        return next(
            new ErrorResponse(`comment not found with the id of ${req.params.commentId}`, 404))
    }

    const newReply = await Reply.create(req.body)

    await comment.addReply(newReply)

    await newReply.save()

    res.status(201).json({ success: true, data: newReply });
})


// @desc    reply on  comment
// @route   /api/v1/comments/:commentId/reply
// @access   public
// modified with sequelize

exports.getReplyOnComment = asyncHandler(async (req, res, next) => {
    let comment = await Comment.findByPk(req.params.commentId)
    if (!comment) {
        return next(
            new ErrorResponse(`comment not found with the id of ${req.params.commentId}`, 404))
    }
    comment = await Comment.findAll({
        where: { id: req.params.commentId },
        include: [
            {
                model: Reply,
                as: 'replies',
                // where: { id: post.id }, // Only include the post with the specific postId
                attributes: ['content'], // Define which post attributes to include
                through: { attributes: [] },

            },
        ]
    }
    )

    res.status(201).json({ success: true, data: comment });
})