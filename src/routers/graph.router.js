const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { graph } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/graph");
api.route({
    meta: meta("total earning", "graph"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/graphTotalEaring",
    handler: graph.graphTotalEaring,
});

api.route({
    meta: meta("client Report", "graph"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/clientReport",
    handler: graph.clientReport,
});
module.exports = api;
