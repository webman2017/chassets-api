const Router = require('koa-joi-router')
const Joi = Router.Joi

module.exports = {
    limit: Joi.number(),
    page: Joi.number(),
    search: Joi.string(),
    filter: Joi.number()
}