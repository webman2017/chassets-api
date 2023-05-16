const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { invoice } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
const paginationValidation = require('./../utils/pagination.util')
let Joi = Router.Joi;
const api = Router();
api.prefix("/extra");
api.route({
    meta: meta("update extra invoice", "extra"),
    method: "put",
    path: "/updateExtra",
    validate: {
        body: {
            invoiceId: Joi.number().required(),
            priceSignContact: Joi.number().required(),
            extra: Joi.array().items({
                id: Joi.number().required(),
                extraName: Joi.string().required(),
                price: Joi.number().required(),
            })
        },
        type: "json",
    },
    handler: invoice.updateExtra,
});
api.route({
    meta: meta("destroy invoice", "invoice"),
    method: "delete",
    path: "/destroyInvoice/:id",
    handler: invoice.destroyInvoice,
});
module.exports = api;
