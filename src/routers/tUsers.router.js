const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { tUsers } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/tUser");
api.route({
    meta: meta("get user", "tUser"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getUser",
    handler: tUsers.getUser,
});

api.route({
    meta: meta("add User", "tUser"),
    method: "post",
    path: "/",
    validate: {
        body: {
            UserName: Joi.string().required(),
            Password: Joi.string().required(),
            FirstName_TH: Joi.string().required(),
            LastName_TH: Joi.string().required(),
            FirstName_EN: Joi.string().required(),
            LastName_EN: Joi.string().required(),
            RoleId: Joi.number().required(),
            RoleName: Joi.string().required(),
            LineId: Joi.string().required(),
            Email: Joi.string().required(),
            PhoneNo: Joi.string().required(),
            CreateBy: Joi.number().required(),
            CreateByName: Joi.number().required(),
        },
        type: "json",
    },
    handler: tUsers.addUser,
});

api.route({
    meta: meta("update User Permission", "tUser"),
    method: "put",
    path: "/updateUser",
    validate: {
        body: {
            UserId: Joi.number().required(),
            UserName: Joi.string().required(),
            FirstName_TH: Joi.string().required(),
            LastName_TH: Joi.string().required(),
            FirstName_EN: Joi.string().required(),
            LastName_EN: Joi.string().required(),
            RoleId: Joi.number().required(),
            RoleName: Joi.string().required(),
            Email: Joi.string().required(),
            PhoneNo: Joi.string().required(),
            CreateBy: Joi.number().required(),
            CreateByName: Joi.number().required(),
        },
        type: "json",
    },
    handler: tUsers.updateUser,
});
api.route({
    meta: meta("get user byid", "tUser"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getUserById/:UserId",
    handler: tUsers.getUserById,
});

api.route({
    meta: meta("delete user", "tUser"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "delete",
    path: "/delete/:UserId",
    handler: tUsers.deleteUser,
});





module.exports = api;
