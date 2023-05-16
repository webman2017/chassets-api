const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { project } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
const paginationValidation = require('./../utils/pagination.util')
let Joi = Router.Joi;
const api = Router();
api.prefix("/project");
api.route({
    meta: meta("get project", "project"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    // validate: {
    //     query: {
    //         ...paginationValidation,
    //     },
    // },
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/getAll",
    handler: project.getProjectName,
});

api.route({
    meta: meta("get project name data", "project"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    // validate: {
    //     query: {
    //         ...paginationValidation,
    //     },
    // },
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/getAllData",
    handler: project.getProjectNameData,
});
api.route({
    meta: meta("update project name", "project"),
    method: "post",
    path: "/getByProjectType",
    validate: {
        body: {
            ProjectType: Joi.string().required(),
        },
        type: "json",
    },
    handler: project.getByProjectType,
});


api.route({
    meta: meta("update project name", "project"),
    method: "put",
    path: "/updateProjectName",
    validate: {
        body: {
            id: Joi.number().required(),
            ProjectName: Joi.string().required(),
            Alley: Joi.string().required(),
            District: Joi.string().required(),
            SubDistrict: Joi.string().required(),
            City: Joi.string().required(),
            // Provine: Joi.string().required(),
            Zipcode: Joi.string().required(),
            TypeProject: Joi.string().required(),
        },
        type: "json",
    },
    handler: project.updateProjectName,
});
api.route({
    meta: meta("add project name", "project"),
    method: "post",
    path: "/addProjectName",
    validate: {
        body: {
            ProjectName: Joi.string().required(),
            Alley: Joi.string().required(),
            District: Joi.string().required(),
            SubDistrict: Joi.string().required(),
            City: Joi.string(),
            // Provine: Joi.string().required(),
            Zipcode: Joi.string(),
            TypeProject: Joi.string(),
        },
        type: "json",
    },
    handler: project.addProjectName,
});
api.route({
    meta: meta("destroy project name", "project"),
    method: "delete",
    path: "/destroyProjectName/:id",
    handler: project.destroyProjectName,
});


api.route({
    meta: meta("get project name by id", "project"),
    method: "get",
    path: "/getProjectNameById/:id",
    handler: project.getProjectById,
});
module.exports = api;
