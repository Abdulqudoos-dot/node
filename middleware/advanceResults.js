const advancedResults = (model, populate) => async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query }
    const removeFields = ['select', 'sort', 'page', 'limit']

    removeFields.forEach(param =>
        delete reqQuery[param]
    )
    let queryStr = JSON.stringify(reqQuery)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    query = model.find(JSON.parse(queryStr))

    if (req.query.select) {
        const field = req.query.select.split(',').join(' ')
        query = query.select(field)
    }
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }

    let page = parseInt(req.query.page, 10) || 1
    let limit = parseInt(req.query.limit, 10) || 5
    const startInd = (page - 1) * limit
    const endInd = (page) * limit
    const total = await model.countDocuments()
    query = query.skip(startInd).limit(limit)

    if (populate) {
        query = query.populate(populate)
    }

    const results = await query
    let pagination = {}
    if (startInd > 0) {
        pagination.pre = {
            page: page - 1,
            limit
        }
    }

    if (endInd < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }
    next()
}

module.exports = advancedResults


