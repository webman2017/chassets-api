const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { client } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/client");
api.route({
    meta: meta("get client", "client"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/",
    handler: client.getClient,
});
api.route({
    meta: meta("get client", "client"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getAll",
    handler: client.getAllClient,
});
api.route({
    meta: meta("get client by id", "client"),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/:clientId",
    handler: client.getClientById,
});
api.route({
    meta: meta("update client", "client"),
    method: "put",
    path: "/update",
    validate: {
        body: {
            id: Joi.number().required(),
            FirstName: Joi.string().required(),
            LastName: Joi.string().required(),
            HouseNo: Joi.string().required(),
            TypeProject: Joi.string().required(),
            ProjectName: Joi.string(),
            Alley: Joi.string(),
            District: Joi.string(),
            SubDistrict: Joi.string(),
            City: Joi.string(),
            // Provine: Joi.string(),
            Zipcode: Joi.string(),
            Phone: Joi.string(),
            Line: Joi.string(),
            Email: Joi.string(),
        },
        type: "json",
    },
    handler: client.updateClient,
});
api.route({
    meta: meta("search client", "client"),
    method: "post",
    path: "/searchClient",
    validate: {
        body: {
            keyword: Joi.string().required(),
        },
        type: "json",
    },
    handler: client.searchClient,
});
api.route({
    meta: meta("fillter client", "client"),
    method: "post",
    path: "/filterClient",
    validate: {
        query: {
            project: Joi.string().valid(['House', 'Town Home', 'Condominium', 'IndividualHouse', 'Enterprise', 'Other']),
            status: Joi.string().valid(['Deposited', 'Quotation', 'Sign Contact']),

        },
        // type: "json",
    },
    handler: client.filterClient,
});

api.route({
    meta: meta("search client", "client"),
    method: "post",
    path: "/searchClient",
    validate: {
        body: {
            FirstName: Joi.string().empty(null).default(null),
        },
        type: "json",
    },
    handler: client.searchClient,
});

api.route({
    meta: meta("add client", "client"),
    method: "post",
    path: "/addClient",
    validate: {
        body: {
            FirstName: Joi.string().required(),
            LastName: Joi.string().required(),
            HouseNo: Joi.string().required(),
            TypeProject: Joi.string().empty("").default(""),
            ProjectName: Joi.string().required(),
            Alley: Joi.string().empty(null).default(null),
            District: Joi.string().empty(null).default(null),
            SubDistrict: Joi.string().empty(null).default(null),
            City: Joi.string().empty(null).default(null),
            // Provine: Joi.string().empty(null).default(null),
            Zipcode: Joi.string().empty(null).default(null),
            Phone: Joi.string().empty(null).default(null),
            Line: Joi.string().empty(null).default(null),
            Email: Joi.string().empty(null).default(null),
        },
        type: "json",
    },
    handler: client.addClient,
});
api.route({
    meta: meta("destroy client", "client"),
    method: "get",
    path: "/destroyClient/:id",
    handler: client.destroyClient,
});
module.exports = api;
