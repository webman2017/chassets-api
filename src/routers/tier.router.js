const Router = require("koa-joi-router");
const meta = require("./../utils/meta.utils");
const { tier } = require("./../controllers");
const authMiddleware = require("../middleware/auth.middleware");
let Joi = Router.Joi;
const api = Router();
api.prefix("/tier");
api.route({
    meta: meta("get tier ทั้งหมดพร้อม parameter data ที่ set ไว้", "tier"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getTier",
    handler: tier.getTier,
});

api.route({
    meta: meta("update paramter Tier อัพเดท parameter เข้าไปใน Tier", "tier"),
    method: "put",
    path: "/updateParameterTier",
    validate: {
        body: {
            tierId: Joi.number().required(),
            parameterId: Joi.number().required(),
        },
        type: "json",
    },
    handler: tier.updateParameterTier,
});


api.route({
    meta: meta("add Tier เพิ่ม Tier เข้าไปในระบบ", "tier"),
    method: "post",
    path: "/",
    validate: {
        query: {
            tierType: Joi.string().valid(['New', 'Duplicate']),
            tierNumDuplicate: Joi.number(),
        },
        // type: "json",
    },
    handler: tier.addTier,
});
api.route({
    meta: meta("active Tier เปิดใช้งาน Tier", "tier"),
    method: "post",
    path: "/activeTier",
    validate: {
        body: {
            tierNum: Joi.number(),
            active: Joi.number(),
        },
        type: "json",
    },
    handler: tier.activeTier,
});
api.route({
    meta: meta("destroy item Price Tier ลบ Tier ออกจากระบบ", "tier"),
    method: "delete",
    path: "/destroyItemPriceTier/:itemId/:tierId",
    handler: tier.destroyItemPriceTier,
});
api.route({
    meta: meta("destroy tier", "tier"),
    method: "delete",
    path: "/destroyTier/:id",
    handler: tier.destroyTier,
});

api.route({
    meta: meta("get all tier by tear num (get data จาก Tier id)", "tier"),
    // pre: async (ctx, next) => await authMiddleware(ctx, next),
    method: "get",
    path: "/getAllTier/:tierNum",
    handler: tier.getAllTierByTierNum,
});
api.route({
    meta: meta("update Tier (อัพเดทข้อมูล Tier)", "tier"),
    method: "post",
    path: "/updatePriceTier",
    validate: {
        body: {
            itemId: Joi.number().required(),
            tierName: Joi.number().required(),
            name: Joi.string().required(),
            minimumPriceFurniture: Joi.number().required(),
            minimumPriceBuildIn: Joi.number().required(),
            priceM: Joi.number().required(),
            priceSqm2: Joi.number().required(),
            priceSqm3: Joi.number().required(),
            priceSqmNon: Joi.number().required(),
            type: Joi.string().required(),
            material: Joi.string().required(),
            addonDefault: Joi.number().required(),
            addonFurniture: Joi.array().items({
                id: Joi.number(),
                default: Joi.number(),
            }),
            addonBuildIn: Joi.array().items({
                id: Joi.number(),
                default: Joi.number(),
            }),
            addonFurnishings: Joi.array().items({
                id: Joi.number(),
                default: Joi.number(),
            })
        },
        type: "json",
    },
    handler: tier.updatePriceTier,
});
api.route({
    meta: meta("add Tier", "tier"),
    method: "post",
    path: "/addPriceTier",
    validate: {
        body: {
            tierName: Joi.number().required(),
            name: Joi.string().required(),
            minimumPriceFurniture: Joi.number().required(),
            minimumPriceBuildIn: Joi.number().required(),
            priceM: Joi.number().required(),
            priceSqm2: Joi.number().required(),
            priceSqm3: Joi.number().required(),
            priceSqmNon: Joi.number().required(),
            type: Joi.string().required(),
            material: Joi.string().required(),
            addonFurniture: Joi.array().items({
                id: Joi.number(),
                default: Joi.number(),
            }),
            addonBuildIn: Joi.array().items({
                id: Joi.number(),
                default: Joi.number(),
            }),
            addonFurnishings: Joi.array().items({
                id: Joi.number(),
                default: Joi.number(),
            })
        },
        type: "json",
    },
    handler: tier.addPriceTier,
});
module.exports = api;
