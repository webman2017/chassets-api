const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { price } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/price");

api.route({
    meta: meta("get price", "price"),
    method: "post",
    path: "/",
    validate: {
        body: {
            type: Joi.number().required(),
        },
        type: "json",
    },
    handler: price.getTearFurniture,
});
module.exports = api;
