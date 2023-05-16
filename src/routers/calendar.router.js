const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { calendar } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/calendar");
api.route({
    meta: meta("get calendar", "calendar"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/",
    handler: calendar.getCalendar,
});
api.route({
    meta: meta("update calendar", "calendar"),
    method: "put",
    path: "/update",
    validate: {
        body: {
            id: Joi.number().required(),
            AppointmentDate: Joi.string().required(),
            FirstName: Joi.string().required(),
            LastName: Joi.string().required(),
            HouseNo: Joi.string().empty("").default(""),
            Alley: Joi.string().required(),
            District: Joi.string().empty(null).default(null),
            SubDistrict: Joi.string().empty(null).default(null),
            Province: Joi.string().empty(null).default(null),
            Zipcode: Joi.string().empty(null).default(null),
            Phone: Joi.string().empty(null).default(null),
            Email: Joi.string().empty(null).default(null),
            City: Joi.string().empty(null).default(null),
        },
        type: "json",
    },
    handler: calendar.updateCalendar,
});
api.route({
    meta: meta("add calendar", "calendar"),
    method: "post",
    path: "/addCalendar",
    validate: {
        body: {
            AppointmentDate: Joi.string().required(),
            FirstName: Joi.string().required(),
            LastName: Joi.string().required(),
            HouseNo: Joi.string().empty("").default(""),
            Alley: Joi.string().required(),
            District: Joi.string().empty(null).default(null),
            SubDistrict: Joi.string().empty(null).default(null),
            Province: Joi.string().empty(null).default(null),
            Zipcode: Joi.string().empty(null).default(null),
            Phone: Joi.string().empty(null).default(null),
            Email: Joi.string().empty(null).default(null),
            City: Joi.string().empty(null).default(null),

        },
        type: "json",
    },
    handler: calendar.addCalendar,
});
api.route({
    meta: meta("destroy calendar", "calendar"),
    method: "delete",
    path: "/destroyCalendar/:id",
    handler: calendar.destroyCalendar,
});
module.exports = api;
