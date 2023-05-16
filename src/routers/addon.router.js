const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { addon } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
const { add } = require("lodash");
let Joi = Router.Joi;
const api = Router();
api.prefix("/addon");
api.route({
    meta: meta("get addon (get ข้อมูล addon)", "addon"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getAddon",
    handler: addon.getAddon,
});
api.route({
    meta: meta("add addon (add ข้อมูล addon)", "addon"),
    method: "post",
    path: "/addAddon",
    validate: {
        body: {
            addonName: Joi.string().required(),
            price: Joi.number().required(),
            percent: Joi.number().required(),
            type: Joi.string().required(),
            materialAddon: Joi.string().required(),
        },
        type: "json",
    },
    handler: addon.addAddOn,
});
api.route({
    meta: meta("update addon ", "addon"),
    method: "put",
    path: "/updateAddon",
    validate: {
        body: {
            id: Joi.number().required(),
            addonName: Joi.string().required(),
            price: Joi.number().required(),
            type: Joi.string().required(),
            percent: Joi.number().required(),
            materialAddon: Joi.string().required(),
        },
        type: "json",
    },
    handler: addon.updateAddOn,
});
api.route({
    meta: meta("destroy addon", "addon"),
    method: "delete",
    path: "/destroyAddon/:id",
    handler: addon.destroyAddon,
});

module.exports = api;
