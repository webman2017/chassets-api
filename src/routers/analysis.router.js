const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { analysis } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/analysis");
api.route({
    meta: meta("Total Sale", "analysis"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/saleOverview",
    handler: analysis.TotalSale,
});
module.exports = api;
