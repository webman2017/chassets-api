const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { analytic } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/analytic");

api.route({
    meta: meta("Total Sale Currently Year ปีปัจจุบัน", "analytic"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/totalSaleCurrentlyYear",
    handler: analytic.TotalSaleCurrentlyYear,
});



api.route({
    meta: meta("top Five", "analytic"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/topFive",
    handler: analytic.topFive,
});



api.route({
    meta: meta("Total Sale Type Monthly", "analytic"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/totalSaleTypeMonthly",
    handler: analytic.totalSaleTypeMonthly,
});


api.route({
    meta: meta("Total Sale Year ตามรายปี", "analytic"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/totalSaleYear",
    handler: analytic.TotalSaleYear,
});


api.route({
    meta: meta("Total Sale Year And Type รายปีตาม ราคา", "analytic"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "post",
    validate: {
        query: {
            type: Joi.string().valid(['signContact', 'extra', 'forecast']),
        },
    },
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/totalSaleYearType",
    handler: analytic.TotalSaleYearType,
});


api.route({
    meta: meta("Total Sale Monthly ยอดการขาย ประจำเดือน", "analytic"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/totalSaleMonthly",
    handler: analytic.TotalSaleMonthly,
});





// api.route({
//     meta: meta("Total Sale Month", "analytic"),
//     method: "get",
//     path: "/totalSaleMonth",
//     handler: analytic.totalSaleMonth,
// });

api.route({
    meta: meta("overview", "analytic"),
    method: "get",
    path: "/overview",
    handler: analytic.overview,
});


api.route({
    meta: meta("client deposit yearly", "analytic"),
    method: "get",
    path: "/clientDepositYearly",
    handler: analytic.clientDepositYearly,
});


api.route({
    meta: meta("Total Deposit Amount Monthly", "analytic"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/totalDepositAmountMonthly",
    handler: analytic.TotalDepositAmount,
});

api.route({
    meta: meta("Total Deposit Monthly", "analytic"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/totalDepositCount",
    handler: analytic.TotalDepositCount,
});

api.route({
    meta: meta("Total Appointment", "analytic"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/totalAppointment",
    handler: analytic.TotalAppointment,
});


module.exports = api;
