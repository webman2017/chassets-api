const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { register } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/register");
api.route({
    meta: meta("register user", "register"),
    method: "post",
    path: "/register",
    validate: {
        body: {
            FullName: Joi.string().required(),
            Email: Joi.string().required(),
            LineID: Joi.string().required(),
            username: Joi.string().required(),
            Phone: Joi.string().required(),
            Password: Joi.string().required(),
            status: Joi.string().required(),
        },
        type: "json",
    },
    handler: register.register,
});
module.exports = api;
