const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { invoice } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
const paginationValidation = require('./../utils/pagination.util')
let Joi = Router.Joi;
const api = Router();
api.prefix("/searchInvoice");
api.route({
    meta: meta("get invoice", "searchInvoice"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    validate: {
        query: {
            ...paginationValidation,
        },
    },
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/searchInvoice",
    handler: invoice.searchInvoice,
});


api.route({
    meta: meta("get invoice", "searchInvoice"),
    method: "post",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    validate: {
        query: {

            status: Joi.string().valid(['Deposited', 'Quotation', 'Sign Contact']),
            dateStart: Joi.string(),
            dateEnd: Joi.string(),
        },
        // type: "json",
    },
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/filterInvoice",
    handler: invoice.filterInvoice,
});


module.exports = api;
