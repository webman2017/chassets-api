const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { item } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/item");
api.route({
    meta: meta("get item", "item"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/",
    handler: item.getItem,
});
api.route({
    meta: meta("destroy item", "item"),
    method: "delete",
    path: "/destroyItem/:id",
    handler: item.destroyItem,
});
module.exports = api;