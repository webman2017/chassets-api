const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { permission } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/roleMenuPermission");
api.route({
    meta: meta("get all permission", "roleMenuPermission"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getAll",
    handler: permission.getAllPermission,
});
api.route({
    meta: meta("destroy permission", "roleMenuPermission"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "delete",
    path: "/:RolePermissionId",
    handler: permission.detroyRolePermission,
});

api.route({
    meta: meta("get all by roleId", "roleMenuPermission"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/byRoldId/:RoleId",
    handler: permission.getPermissionByRoleId,
});

api.route({
    meta: meta("add Permission", "roleMenuPermission"),
    method: "post",
    path: "/",
    validate: {
        body: {
            RoleId: Joi.number().required(),
            Permissions: Joi.array().items({
                MenuId: Joi.number().required(),
                IsCreate: Joi.number().required(),
                IsRead: Joi.number().required(),
                IsWrite: Joi.number().required(),
                CreateOn: Joi.string().required(),
                CreateBy: Joi.number().required(),
            })
        },
        type: "json",
    },
    handler: permission.addPermission,
});

api.route({
    meta: meta("update Permission", "roleMenuPermission"),
    method: "put",
    path: "/update",
    validate: {
        body: {
            RoleId: Joi.number().required(),
            Permissions: Joi.array().items({
                MenuId: Joi.number().required(),
                IsCreate: Joi.number().required(),
                IsRead: Joi.number().required(),
                IsWrite: Joi.number().required(),
                CreateOn: Joi.string().required(),
                CreateBy: Joi.number().required(),
            })
        },
        type: "json",
    },
    handler: permission.updatePermission,
});

module.exports = api;
