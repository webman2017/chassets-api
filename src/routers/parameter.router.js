const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { parameter } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/parameter");

api.route({
    meta: meta("get parameter", "parameter"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getAll",
    handler: parameter.getAll,
});
api.route({
    meta: meta("Add Parameter", "parameter"),
    method: "post",
    path: "/addParameter",
    validate: {
        body: {
            parameterGroupName: Joi.string().required(),
            parameterDetails1: {
                heightStart: Joi.number().precision(2),
                heightEnd: Joi.number().precision(2),
                heightUnit: Joi.string(),
            },
            parameterDetails2: {
                heightStart: Joi.number().precision(2),
                heightEnd: Joi.number().precision(2),
                heightUnit: Joi.string(),
            },
            parameterDetails3: {
                heightStart: Joi.number().precision(2),
                heightEnd: Joi.number().precision(2),
                heightUnit: Joi.string(),
            },
        },
        type: "json",
    },
    handler: parameter.addParameter,
});
api.route({
    meta: meta("update Parameter", "parameter"),
    method: "put",
    path: "/updateParameter",
    validate: {
        body: {
            id: Joi.number().required(),
            parameterGroupName: Joi.string().required(),
            parameterDetails1: {
                heightStart: Joi.number().precision(2),
                heightEnd: Joi.number().precision(2),
                heightUnit: Joi.string(),
            },
            parameterDetails2: {
                heightStart: Joi.number().precision(2),
                heightEnd: Joi.number().precision(2),
                heightUnit: Joi.string(),
            },
            parameterDetails3: {
                heightStart: Joi.number().precision(2),
                heightEnd: Joi.number().precision(2),
                heightUnit: Joi.string(),
            },
        },
        type: "json",
    },
    handler: parameter.updateParameter,
});
api.route({
    meta: meta("destroy paramter", "parameter"),
    method: "delete",
    path: "/destroyParameter/:parameterGroupId",
    handler: parameter.destroyParameter,
});
module.exports = api;
