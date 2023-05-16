const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { project } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/projectType");
api.route({
    meta: meta("get project type", "projectType"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/",
    handler: project.getProject,
});
api.route({
    meta: meta("add project", "projectType"),
    method: "post",
    path: "/addProject",
    validate: {
        body: {
            // id: Joi.number().required(),
            projectName: Joi.string().required(),
        },
        type: "json",
    },
    handler: project.addProject,
});
api.route({
    meta: meta("update project", "projectType"),
    method: "put",
    path: "/updateProject",
    validate: {
        body: {
            id: Joi.number().required(),
            projectName: Joi.string().required(),
        },
        type: "json",
    },
    handler: project.updateProject,
});
api.route({
    meta: meta("destroy project", "projectType"),
    method: "delete",
    path: "/destroyProject/:id",
    handler: project.destroyProject,
});
module.exports = api;
