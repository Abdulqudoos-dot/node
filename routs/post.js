const express = require('express')
const { getPosts, getPost, creatPost, uploadPostPhoto, commentOnPost, getCommentOnPost, replyOnComment, getReplyOnComment, } = require('../controller/post')
const { protect } = require('../middleware/auth')
const router = express.Router()

router.route('/').get(getPosts).post(protect, creatPost)
router.route('/:id').get(getPost)
router.route('/:id/photo').put(protect, uploadPostPhoto)
router.route('/:postId/comments').post(protect, commentOnPost)
router.route('/:postId/comments').get(getCommentOnPost)
router.route('/comments/:commentId/reply').post(replyOnComment).get(getReplyOnComment)







module.exports = router