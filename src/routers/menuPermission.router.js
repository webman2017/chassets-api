const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { mMenuPermission } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/menuItemPermission");
api.route({
    meta: meta("get all menu", "menuItemPermission"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getMenu",
    handler: mMenuPermission.getMenu,
});

api.route({
    meta: meta("add Menu Permission", "menuItemPermission"),
    method: "post",
    path: "/",
    validate: {
        body: {
            ParentId: Joi.number().required(),
            Order: Joi.number().required(),
            MenuItemName: Joi.string().required(),
            MenuIcon: Joi.string().required(),
            Url: Joi.string().required(),
            // IsCreate: Joi.number().required(),
            // IsRead: Joi.number().required(),
            // IsWrite: Joi.number().required(),
            CreateOn: Joi.string().required(),
            CreateBy: Joi.number().required(),
            CreateByName: Joi.string().required(),
        },
        type: "json",
    },
    handler: mMenuPermission.addMenu,
});

api.route({
    meta: meta("update Menu Permission", "menuItemPermission"),
    method: "put",
    path: "/",
    validate: {
        body: {
            MenuId: Joi.number().required(),
            ParentId: Joi.number().required(),
            Order: Joi.number().required(),
            MenuItemName: Joi.string().required(),
            MenuIcon: Joi.string().required(),
            Url: Joi.string().required(),
            IsCreate: Joi.number().required(),
            IsRead: Joi.number().required(),
            IsWrite: Joi.number().required(),
            CreateOn: Joi.string().required(),
            CreateBy: Joi.string().required(),
            CreateByName: Joi.string().required(),
        },
        type: "json",
    },
    handler: mMenuPermission.updateMenu,
});
api.route({
    meta: meta("detroy menu item", "menuItemPermission"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "delete",
    path: "/deleteMenu/:PermissionId",
    handler: mMenuPermission.detroyMenuPermission,
});
module.exports = api;
