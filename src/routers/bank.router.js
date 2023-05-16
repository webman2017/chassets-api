const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { bank } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/bank");
api.route({
    meta: meta("get bank", "bank"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/",
    handler: bank.getBank,
});
module.exports = api;
