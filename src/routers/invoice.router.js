const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { invoice } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
const paginationValidation = require('./../utils/pagination.util')
let Joi = Router.Joi;
const api = Router();
api.prefix("/invoice");
api.route({
    meta: meta("get invoice", "invoice"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    validate: {
        query: {
            ...paginationValidation,
        },
    },
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/getAll",
    handler: invoice.getInvoice,
});

api.route({
    meta: meta("get invoice by id", "invoice"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/:invoiceId",
    handler: invoice.getInvoiceById,
});

api.route({
    meta: meta("get invoice by quotation id", "invoice"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    path: "/quotatioin/:quotationId",
    handler: invoice.getInvoiceByQuotationId,
});


api.route({
    meta: meta("update process invoice", "invoice"),
    method: "put",
    path: "/updateProcess",
    validate: {
        body: {
            invoiceId: Joi.number().required(),
            process: Joi.string().required()
        },
        type: "json",
    },
    handler: invoice.updateProcess,
});
api.route({
    meta: meta("add invoice", "invoice"),
    method: "post",
    path: "/addInvoice",
    validate: {
        body: {
            Date_Issued: Joi.string().required(),
            Date_Due: Joi.string().required(),
            Client_id: Joi.string().required(),
            ProjectName: Joi.string().required(),
            firstName: Joi.string(),
            LastName: Joi.string().required(),
            HouseNo: Joi.string(),
            Alley: Joi.string(),
            District: Joi.string(),
            SubDistrict: Joi.string(),
            City: Joi.string(),
            // Provine: Joi.string(),
            Zipcode: Joi.string(),
            Phone: Joi.string(),
            Email: Joi.string(),
            info: Joi.array().items({
                floor: Joi.string(),
                room: Joi.array().items({
                    room: Joi.string(),
                    item: Joi.array().items({
                        itemNames: Joi.string(),
                        priceItem: Joi.number(),
                        types: Joi.string(),
                        DimemsionW: Joi.number(),
                        DimemsionH: Joi.number(),
                        priceSub: Joi.number(),
                        priceMateria: Joi.number(),
                        priceaddon: Joi.number(),
                        itemType: Joi.array().items({
                            id: Joi.number(),
                            item_id: Joi.number(),
                            type: {
                                active: Joi.string(),
                                id: Joi.string(),
                                type_name: Joi.string()
                            },
                            type_id: Joi.number(),
                        }),
                        addon: Joi.array().items({
                            id: Joi.number(),
                            item_id: Joi.number(),
                            type: Joi.string(),
                            default: Joi.number(),
                            add_on: {
                                id: Joi.number(),
                                add_on: Joi.string(),
                                percent: Joi.number(),
                                price: Joi.number(),
                                materialAddon: Joi.string(),
                            }
                        }),
                        materia: {
                            id: Joi.number(),
                            item_id: Joi.number(),
                            material_id: Joi.number(),
                            material: {
                                id: Joi.number(),
                                material_name: Joi.string(),
                                percent: Joi.number(),
                            }
                        },
                        total_price: Joi.number()
                    })
                })
            }),
            SubtotalPrice: Joi.number(),
            AdditionalPrice: Joi.number(),
            MaterialPrice: Joi.number(),
            TotalAmont: Joi.number(),
            Bank: Joi.number(),
            Salesperson: Joi.string(),
        },
        type: "json",
    },
    handler: invoice.addInvoice,
});
api.route({
    meta: meta("destroy invoice", "invoice"),
    method: "delete",
    path: "/destroyInvoice/:id",
    handler: invoice.destroyInvoice,
});
module.exports = api;
