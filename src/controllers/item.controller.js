const { item, itemAddon, addon, furniturePrice, buildInPrice, itemMaterial, material, itemType, type, tier, parameterDetails, parameter } = require("../models");
const Sequelize = require("sequelize");
const { ClientBase } = require("pg");
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const { secret } = require("../configs");
const moment = require("moment");
const Op = Sequelize.Op;
const start = Date.now();
const path = require('path');
const { request } = require("http");
const __basedir = path.resolve();
const fs = require("fs");
const cors = require('cors');
const { create } = require("lodash");
module.exports = {
    async getItem(ctx, _next) {
        try {
            const tierDataa = await tier.findOne({
                where: {
                    active: 1
                }
            });
            const parameterData = await tier.findAll({
                include:
                {
                    model: parameter, paranoid: false,
                    attributes: ['parameterGroupName', 'id'],
                    include: [{
                        model: parameterDetails, paranoid: false,
                    }]
                },
                where: {
                    tier_name: tierDataa.dataValues.tier_name
                }
            });
            const getItem = await item.findAll({
                attributes: ['id', 'item_name', 'addon_default', 'material', 'minimumPrice', 'minimumPriceFurniture', 'minimumPriceBuildIn'],
                include: [
                    {
                        model: furniturePrice, paranoid: false,
                        where: {
                            tier_id: tierDataa.dataValues.tier_name,
                        },
                        required: false,
                        attributes: ['price', 'item_id'],
                    }],
                order: [
                    ['id', 'asc'],
                ],
                where: {
                    tierName: tierDataa.dataValues.tier_name
                }
            }
            )
            const getAddOn = await itemAddon.findAll({
                attributes: ['id', 'item_id', 'type', 'default'],
                include:
                {
                    model: addon, paranoid: false,
                    attributes: ['id', 'add_on', 'price', 'percent', 'materialAddon'],
                },
            })
            const buildInPriceData = await buildInPrice.findAll({
                where: {
                    tier_id: tierDataa.dataValues.tier_name
                },
            })
            const itemTypeData = await itemType.findAll({
                include:
                {
                    model: type, paranoid: false,
                    required: false,
                },
            })
            const itemMaterialData = await itemMaterial.findAll({
                include:
                {
                    model: material, paranoid: false,
                },
            })
            const dd = await getItem.map(item => {
                const addonBuildIn = getAddOn.filter(character => character.item_id === item.dataValues.id && character.type === "buildIn");
                const addonFurniture = getAddOn.filter(character => character.item_id === item.dataValues.id && character.type === "furniture");
                const addonFurnishings = getAddOn.filter(character => character.item_id === item.dataValues.id && character.type === "Furnishings");
                let merged = ""
                const buildInPrice = buildInPriceData.filter(buildIn => buildIn.item_id === item.dataValues.id);
                if (parameterData.length > 0) {
                    let dataParameter = parameterData[0].dataValues.parameter.dataValues.parameterDetails
                    var result = dataParameter.map(person => ({ sqm_start: person.heightStart, sqm_end: person.heightEnd, heightUnit: person.heightUnit }));
                    // console.log(result)
                    var result1 = buildInPrice.map((person, index) => (
                        {
                            id: person.dataValues.id,
                            price_rate: person.dataValues.price_rate,
                            item_id: person.dataValues.item_id,
                            type_id: person.dataValues.type_id,
                            tier_id: person.dataValues.tier_id, ...result[index]
                        }
                    )
                    );
                }
                const itemMaterial = itemMaterialData.filter(itemMaterial => itemMaterial.item_id === item.dataValues.id);
                const itemType = itemTypeData.filter(itemType => itemType.item_id === item.dataValues.id);
                if (parameterData.length > 0) {

                    merged = {
                        item: item.id,
                        item_name: item.item_name,
                        addonDefault: item.addon_default,
                        materialDefault: item.material,
                        // minimumPrice: item.minimumPrice,
                        minimumPriceFurniture: item.minimumPriceFurniture,
                        minimumPriceBuildIn: item.minimumPriceBuildIn,
                        furniturePrice: item.tear_furniture,
                        addonBuildIn,
                        addonFurniture,
                        addonFurnishings,
                        buildInPrice: result1,
                        itemMaterial,
                        itemType
                    };
                    return merged
                } else if (parameterData.length = 0) {


                    merged = {
                        item: item.id,
                        item_name: item.item_name,
                        addonDefault: item.addon_default,
                        materialDefault: item.material,
                        // minimumPrice: item.minimumPrice,
                        minimumPriceFurniture: item.minimumPriceFurniture,
                        minimumPriceBuildIn: item.minimumPriceBuildIn,
                        furniturePrice: item.tear_furniture,
                        addonBuildIn,
                        addonFurniture,
                        addonFurnishings,
                        buildInPrice,
                        itemMaterial,
                        itemType
                    };
                    return merged
                }
            })

            if (dd) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: dd
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: err,
                    data: []
                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err,
                data: []

            }
        }
    },
    async updateItem(ctx, _next) {
        try {
            const idData = ctx.request.body
            console.log(idData.id)
            const updateClient = await item.update({
                item_name: idData.itemName,
                minimumPrice: idData.minimumPrice,
                active: idData.active,
            }, {
                where: {
                    id: idData.id
                }
            })
            if (updateClient) {
                ctx.body = {
                    status: 200,
                    message: "success",

                }
            } else {
                ctx.body = {
                    status: 500,
                    message: "fail",

                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err,

            }
        }
    },
    async addItem(ctx, _next) {
        try {
            const data = ctx.request.body
            console.log(data)
            const createClient = await item.create({
                item_name: data.itemName,
                minimumPrice: data.minimumPrice,
                active: 1
            })
            if (createClient) {
                ctx.body = {
                    status: 200,
                    message: "success",
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: "fail",
                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err,
            }
        }
    },
    async destroyItem(ctx, _next) {
        try {
            const data = ctx.request.params
            const resultItem = await item.destroy({
                where: { id: data.id },
            });
            console.log(resultItem)
            resultItem == 1 ? ctx.body = {
                status: 200, result: "detroy item success"
            } : ctx.body = { status: 500, result: "detroy item fail" }
        } catch (err) {
            ctx.err;
        }
    }
};
