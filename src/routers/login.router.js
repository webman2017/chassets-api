const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { register } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/login");

api.route({
    meta: meta("login", "login"),
    method: "post",
    path: "/login",
    validate: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),

        },
        type: "json",
    },
    handler: register.login,
});

module.exports = api;
