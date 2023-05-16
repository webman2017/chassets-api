const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { mRole } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/role");
api.route({
    meta: meta("get role", "role"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/roleAll",
    handler: mRole.getRole,
});
api.route({
    meta: meta("add role", "role"),
    method: "post",
    path: "/addRole",
    validate: {
        body: {
            RoleName: Joi.string().required(),
            IsCreate: Joi.number().required(),
            IsRead: Joi.number().required(),
            IsWrite: Joi.number().required(),
            CreateBy: Joi.number().required(),
            CreateByName: Joi.string().required(),
        },
        type: "json",
    },
    handler: mRole.addRole,
});

api.route({
    meta: meta("update Role", "role"),
    method: "put",
    path: "/",
    validate: {
        body: {
            RoleId: Joi.number().required(),
            RoleName: Joi.string().required(),
            IsCreate: Joi.number().required(),
            IsRead: Joi.number().required(),
            IsWrite: Joi.number().required(),
        },
        type: "json",
    },
    handler: mRole.updateRole,
});
api.route({
    meta: meta("detroy role", "role"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "delete",
    path: "/deleteRole/:roleId",
    handler: mRole.detroyRole,
});
module.exports = api;
