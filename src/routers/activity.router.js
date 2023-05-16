const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { activity } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/activity");
api.route({
    meta: meta("get activity (get data จากการออกใบเสนอราคา)", "activity"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getActivity",
    handler: activity.getActivity,
});

api.route({
    meta: meta("get activity user", "activity"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getActivityUser/:userId",
    handler: activity.getActivityUser,
});

api.route({
    meta: meta("add activity", "activity"),
    method: "post",
    path: "/",
    validate: {
        body: {
            UserName: Joi.string().required(),
            FirstName_TH: Joi.string().required(),
            RoleId: Joi.number().required(),
            LastName_TH: Joi.string().required(),
            FirstName_EN: Joi.string().required(),
            LastName_EN: Joi.string().required(),
            Email: Joi.string().required(),
            PhoneNo: Joi.string().required(),
            CreateBy: Joi.number().required(),
            CreateByName: Joi.number().required(),
        },
        type: "json",
    },
    handler: activity.addActivity,
});
module.exports = api;
