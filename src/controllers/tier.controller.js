const { item, itemAddon, addon, furniturePrice, buildInPrice, itemMaterial, material, itemType, type, tier, parameter, parameterDetails } = require("../models");
const Sequelize = require("sequelize");
const { ClientBase } = require("pg");
const jwt = require("jsonwebtoken");
const { secret } = require("../configs");
const moment = require("moment");
const { getPagination } = require('./../utils/common.utils')
const Op = Sequelize.Op;
const start = Date.now();
const path = require('path');
const { request } = require("http");
const __basedir = path.resolve();
const fs = require("fs");
const { create, includes } = require("lodash");
const parameterDetailsModel = require("../models/parameterDetails.model");
const { async } = require("rxjs");
module.exports = {
    async getTier(ctx, _next) {
        try {
            const tierData = await tier.findAll({
                include:
                {
                    model: parameter, paranoid: false,
                    attributes: ['parameterGroupName', 'id'],
                    include: [{
                        model: parameterDetails, paranoid: false,
                    }]
                },
            });
            if (tierData) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: tierData
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail',
                    data: []
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
    async updateParameterTier(ctx, _next) {
        const body = ctx.request.body
        const updateResult = await tier.update({
            parameterId: body.parameterId
        }, {
            where: {
                id: body.tierId
            }
        })
        if (updateResult) {
            ctx.body = {
                status: 200,
                message: 'success',
            }
        } else {
            ctx.body = {
                status: 500,
                message: 'fail',
            }
        }
    },
    async addTier(ctx, _next) {
        try {
            const { query } = ctx
            const maxData = await tier.findAll({
                attributes: [[Sequelize.fn('max', Sequelize.col('tier_name')), 'max_tier']],
            });
            const addTierMax = maxData[0].dataValues.max_tier + 1
            await tier.create({
                tier_name: addTierMax,
                active: 0
            })
            if (query.tierType == "Duplicate") {
                const tierData = await furniturePrice.findAll({
                    where: {
                        tier_id: query.tierNumDuplicate
                    }
                });
                const tierBuildIn = await buildInPrice.findAll({
                    where: {
                        tier_id: query.tierNumDuplicate
                    }
                });
                const tierBuildInDuplicate = []
                await tierBuildIn.map(item => {
                    tierBuildInDuplicate.push({
                        item_id: item.item_id,
                        sqm_start: item.sqm_start,
                        sqm_end: item.sqm_end,
                        price_rate: item.price_rate,
                        type_id: 2,
                        tier_id: addTierMax
                    })
                })
                await buildInPrice.bulkCreate(
                    tierBuildInDuplicate
                );
                const dataDuplicate = []
                await tierData.map(item => {
                    dataDuplicate.push({
                        type_id: 1,
                        price: item.price,
                        item_id: item.item_id,
                        tier_id: addTierMax
                    })
                })
                await furniturePrice.bulkCreate(
                    dataDuplicate
                );
                ctx.body = {
                    status: 200,
                    message: 'success'
                }
            } else {
                ctx.body = 'New'
            }

        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err,
            }
        }
    },
    async destroyItemPriceTier(ctx, _next) {
        const data = ctx.request.params
        console.log(data.itemId)
        console.log(data.tierId)
        const destroyitem = await item.destroy({
            where: {
                id: data.itemId,
                tierName: data.tierId
            }
        })

        await furniturePrice.destroy({
            where: {
                item_id: data.itemId,
                tier_id: data.tierId
            }
        })
        await buildInPrice.destroy({
            where: {
                item_id: data.itemId,
                tier_id: data.tierId
            }
        })
        await itemAddon.destroy({
            where: {
                item_id: data.itemId,
            }
        })
        await itemType.destroy({
            where: {
                item_id: data.itemId,
            }
        })
        await itemMaterial.destroy({
            where: {
                item_id: data.itemId,
            }
        })
        if (destroyitem) {
            ctx.body = {
                status: 200,
                message: 'success'
            }
        } else {
            ctx.body = {
                status: 500,
                message: 'fail'
            }
        }
        // }
    },
    async updatePriceTier(ctx, _next) {
        const body = ctx.request.body
        const addonFurniture = body.addonFurniture
        const addonBuildIn = body.addonBuildIn
        const addonFurnishings = body.addonFurnishings
        const addonData = body.addonDefault
        let addonName = await addon.findOne({
            where: {
                id: addonData
            }
        })
        if (addonName) {
            const updateData = await item.update({
                item_name: body.name,
                minimumPriceFurniture: body.minimumPriceFurniture,
                minimumPriceBuildIn: body.minimumPriceBuildIn,
                addon_default: a
            },
                {
                    where: {
                        id: body.itemId
                    }
                })
        } else {

            const updateData = await item.update({
                item_name: body.name,
                minimumPriceFurniture: body.minimumPriceFurniture,
                minimumPriceBuildIn: body.minimumPriceBuildIn,
                addon_default: null
            },
                {
                    where: {
                        id: body.itemId
                    }
                })
        }

        if (addonFurniture.length == 0 && addonBuildIn.length == 0 && addonFurnishings.length == 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })

        } else if (addonFurniture.length > 0 && addonBuildIn.length == 0 && addonFurnishings.length == 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonFurniture.map(async (item) => {
                console.log(item.id)
                await itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'furniture',
                    default: item.default
                })
            })
        } else if (addonFurniture.length > 0 && addonBuildIn.length > 0 && addonFurnishings.length == 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonFurniture.map(async (item) => {

                console.log(item.id)
                await itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'furniture',
                    default: item.default
                })
            })
        }
        else if (addonFurniture.length > 0 && addonBuildIn.length > 0 && addonFurnishings.length > 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonFurniture.map(async (item) => {

                console.log(item.id)
                await itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'furniture',
                    default: item.default
                })
            })
        }
        else if (addonFurniture.length > 0 && addonBuildIn.length == 0 && addonFurnishings.length > 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonFurniture.map(async (item) => {

                console.log(item.id)
                await itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'furniture',
                    default: item.default


                })
            })
        }
        // return

        if (addonFurnishings.length == 0 && addonBuildIn.length == 0 && addonFurniture.length == 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
        } else if (addonFurnishings.length > 0 && addonBuildIn.length == 0 && addonFurniture.length == 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonFurnishings.map((item) => {
                itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'Furnishings',
                    default: item.default
                })
            })
        }
        else if (addonFurnishings.length > 0 && addonBuildIn.length > 0 && addonFurniture.length > 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonFurnishings.map((item) => {
                itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'Furnishings',
                    default: item.default
                })
            })
        }
        else if (addonFurnishings.length > 0 && addonBuildIn.length > 0 && addonFurniture.length == 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonFurnishings.map((item) => {
                itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'Furnishings',
                    default: item.default
                })
            })
        }
        else if (addonFurnishings.length > 0 && addonBuildIn.length == 0 && addonFurniture.length > 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonFurnishings.map((item) => {
                itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'Furnishings',
                    default: item.default
                })
            })
        }
        if (addonBuildIn.length == 0 && addonFurniture.length == 0 && addonFurnishings.length == 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
        } else if (addonBuildIn.length > 0 && addonFurniture.length > 0 && addonFurnishings.length > 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonBuildIn.map((item) => {
                itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'buildIn',
                    default: item.default
                })
            })
        } else if (addonBuildIn.length > 0 && addonFurniture.length > 0 && addonFurnishings.length == 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonBuildIn.map((item) => {
                itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'buildIn',
                    default: item.default
                })
            })
        }
        else if (addonBuildIn.length > 0 && addonFurniture.length == 0 && addonFurnishings.length > 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonBuildIn.map((item) => {
                itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'buildIn',
                    default: item.default
                })
            })
        }
        else if (addonBuildIn.length > 0 && addonFurniture.length == 0 && addonFurnishings.length == 0) {
            await itemAddon.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await addonBuildIn.map((item) => {
                itemAddon.create({
                    item_id: body.itemId,
                    addon_id: item.id,
                    type: 'buildIn',
                    default: item.default
                })
            })
        }
        if (body.type == "Furniture") {
            await furniturePrice.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            const result = await furniturePrice.create({
                item_id: body.itemId,
                tier_id: body.tierName,
                type_id: 1,
                price: body.priceM
            }

            )
            await buildInPrice.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await itemType.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await itemType.create({
                item_id: body.itemId,
                type_id: 1
            })
            if (result) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail',
                }
            }
        } else if (body.type == "BuiltIn") {
            await itemType.destroy({
                where: {
                    item_id: body.itemId,
                }
            })
            await furniturePrice.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await buildInPrice.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await itemType.create({
                item_id: body.itemId,
                type_id: 2
            })
            const result1 = await buildInPrice.create({
                price_rate: body.priceSqm2,
                item_id: body.itemId,
                tier_id: body.tierName,
                type_id: 2,
                sqm_start: 0,
                sqm_end: 2.45
            })
            const result2 = await buildInPrice.create({
                price_rate: body.priceSqm3,
                item_id: body.itemId,
                tier_id: body.tierName,
                type_id: 2,
                sqm_start: 2.45,
                sqm_end: 2.95
            })
            const result3 = await buildInPrice.create({
                price_rate: body.priceSqmNon,
                item_id: body.itemId,
                tier_id: body.tierName,
                type_id: 2,
                sqm_start: 3,
                sqm_end: 10000
            })
            if (result1 && result2 && result3) {
                ctx.body = {
                    status: 200,
                    message: 'success'
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: fail
                }
            }
        } else if (body.type == "Furnishings") {
            await furniturePrice.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await buildInPrice.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await itemType.destroy({
                where: {
                    item_id: body.itemId,
                }
            })
            await itemType.create({
                item_id: body.itemId,
                type_id: 3
            })

        } else if (body.type == "MultiChoice") {
            await itemType.destroy({
                where: {
                    item_id: body.itemId,
                }
            })
            await itemType.create({
                item_id: body.itemId,
                type_id: 1
            })
            await itemType.create({
                item_id: body.itemId,
                type_id: 2
            })


            await furniturePrice.destroy({
                where: {
                    item_id: body.itemId,
                }
            })

            await furniturePrice.create({
                price: body.priceM,
                item_id: body.itemId,
                tier_id: body.tierName
            }
            )

            await buildInPrice.destroy({
                where: {
                    item_id: body.itemId,
                }
            })
            await buildInPrice.create({
                price_rate: body.priceSqm2,
                item_id: body.itemId,
                tier_id: body.tierName,
                type_id: 2,
                sqm_start: 0,
                sqm_end: 2.45
            }
            )
            await buildInPrice.create({
                price_rate: body.priceSqm3,
                item_id: body.itemId,
                tier_id: body.tierName,
                type_id: 2,
                sqm_start: 2.45,
                sqm_end: 2.95
            }
            )
            await buildInPrice.create({
                price_rate: body.priceSqmNon,
                item_id: body.itemId,
                tier_id: body.tierName,
                type_id: 2,
                sqm_start: 3,
                sqm_end: 10000
            }
            )
        }
        if (body.material == "MDF") {
            await itemMaterial.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await itemMaterial.create({
                item_id: body.itemId,
                material_id: 1
            })
        } else if (body.material == "HMR") {
            await itemMaterial.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await itemMaterial.create({
                item_id: body.itemId,
                material_id: 2
            })
        } else if (body.material == "MultiChoice") {
            await itemMaterial.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await itemMaterial.create({
                item_id: body.itemId,
                material_id: 2
            })
            await itemMaterial.create({
                item_id: body.itemId,
                material_id: 1
            })
            await itemMaterial.create({
                item_id: body.itemId,
                material_id: 3
            })
        } else if (body.material == "Regular") {
            await itemMaterial.destroy({
                where: {
                    item_id: body.itemId
                }
            })
            await itemMaterial.create({
                item_id: body.itemId,
                material_id: 3
            })
        }
        ctx.body = {
            status: 200,
            message: 'success',
        }
    },
    async destroyTier(ctx, _next) {
        try {
            const data = ctx.request.params
            // console.log(data.id)
            const tierDataa = await tier.findOne({
                where: {
                    id: data.id
                }
            });
            // console.log(tierDataa.dataValues.tier_name)
            // return
            const tierDataFurniture = await furniturePrice.destroy({
                where: {
                    tier_id: tierDataa.dataValues.tier_name
                }
            });
            const tierBuildIn = await buildInPrice.destroy({
                where: {
                    tier_id: tierDataa.dataValues.tier_name
                }
            });
            const tierData = await tier.destroy({
                where: {
                    id: data.id
                }
            });
            if (tierData) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: tierData
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail',
                    data: []
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
    async getAllTier(ctx, _next) {
        try {
            const tierData = await tier.findAll({});
            const buildInData = await buildInPrice.findAll({
                where: {
                    tier_id: tierData[0].dataValues.id
                }
            });
            const furnitureData = await furniturePrice.findAll({
                where: {
                    tier_id: tierData[0].dataValues.id
                }
            });
            let data = {
                buildInData, furnitureData
            };
            if (tierData) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: tierData
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail',
                    data: []
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
    async getAllTierByTierNum(ctx, _next) {
        try {
            const data = ctx.request.params
            const getItem = await item.findAll({
                attributes: ['id', 'item_name', 'addon_default', 'material', 'minimumPriceFurniture', 'minimumPriceBuildIn'],
                include: [
                    {
                        model: furniturePrice, paranoid: false,
                        attributes: ['price', 'item_id', 'tier_id'],
                        where: {
                            tier_id: data.tierNum
                        },
                        required: false,
                    }],

                order: [
                    ['id', 'ASC'],
                ],
                where: {
                    tierName: data.tierNum
                },
            })
            const getAddOn = await itemAddon.findAll({
                attributes: ['id', 'item_id', 'type', 'default'],
                include:
                {
                    model: addon, paranoid: false,
                    attributes: ['id', 'add_on', 'price', 'percent', 'type', 'materialAddon'],
                },
            })


            // console.log(getAddOn)


            const buildInPriceData = await buildInPrice.findAll({
                where: {
                    tier_id: data.tierNum
                }
            })
            const itemTypeData = await itemType.findAll({
                include:
                {
                    model: type, paranoid: false,
                },
            })
            const itemMaterialData = await itemMaterial.findAll({
                include:
                {
                    model: material, paranoid: false,
                    // attributes: ['id', 'material_name'],
                },
            })
            const dd = await getItem.map(item => {
                let addonBuildIn = getAddOn.filter(character => character.item_id === item.dataValues.id && character.type === "buildIn");
                let addonFurniture = getAddOn.filter(character => character.item_id === item.dataValues.id && character.type === "furniture");
                let addonFurnishings = getAddOn.filter(character => character.item_id === item.dataValues.id && character.type === "Furnishings");

                let merged = ""
                let buildInPrice = buildInPriceData.filter(buildIn => buildIn.item_id === item.dataValues.id);
                let itemMaterial = itemMaterialData.filter(itemMaterial => itemMaterial.item_id === item.dataValues.id);
                let itemType = itemTypeData.filter(itemType => itemType.item_id === item.dataValues.id);
                let priceM = 0
                if (item.tear_furniture !== null) {
                    priceM = item.tear_furniture.dataValues.price
                } else {
                    priceM = 0
                }
                let sqm1 = 0
                let sqm2 = 0
                let sqm3 = 0
                if (buildInPrice.length > 0) {
                    sqm1 = buildInPrice[0].price_rate
                    sqm2 = buildInPrice[1].price_rate
                    sqm3 = buildInPrice[2].price_rate
                }
                let materialData = ''
                if (itemMaterial.length == 3) {
                    materialData = 'MultiChoice'
                } else if (itemMaterial.length == 1) {
                    let obj1 = itemMaterial.find(o => o.material_id == 1);
                    let obj2 = itemMaterial.find(o => o.material_id == 2);
                    let obj3 = itemMaterial.find(o => o.material_id == 3);
                    console.log('zzzz:' + obj1)
                    console.log('zzzz:' + obj2)
                    console.log('zzzz:' + obj3)
                    if (obj1) {
                        materialData = 'MDF'
                    } else if (obj2) {
                        materialData = 'HMR'

                    } else if (obj3) {
                        materialData = 'Regular'
                    }

                }
                const obj = itemMaterial

                console.log(itemType[0].dataValues.type_id)
                let type = ''
                if (item.tear_furniture !== null && buildInPrice.length > 0) {
                    type = 'MultiChoice'
                } else if (item.tear_furniture !== null && buildInPrice.length == 0 || itemType[0].dataValues.type_id == 1) {
                    type = 'Furniture'
                } else if (item.tear_furniture == null && buildInPrice.length > 0) {
                    type = 'BuiltIn'
                } else {
                    type = 'Furnishings'
                }
                merged = {
                    id: item.id,
                    name: item.item_name,
                    addonDefault: item.addon_default,
                    materialDefault: item.material,
                    minimumPriceFurniture: item.minimumPriceFurniture,
                    minimumPriceBuildIn: item.minimumPriceBuildIn,
                    priceM: priceM,
                    priceSqm2: sqm1,
                    priceSqm3: sqm2,
                    priceSqmNon: sqm3,
                    type: type,
                    material: materialData,
                    itemMaterial,
                    buildInPrice,
                    addonFurniture,
                    addonBuildIn,
                    addonFurnishings
                };
                return merged
            })
            ctx.body = {
                status: 200,
                message: 'success',
                data: dd
            }
            return
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err,
            }
        }
    },
    async addCalendar(ctx, _next) {
        try {
            const data = ctx.request.body
            const createCalendar = await calendar.create({
                Appointment_date: data.AppointmentDate,
                FirstName: data.FirstName,
                LastName: data.LastName,
                HouseNo: data.HouseNo,
                Alley: data.Alley,
                District: data.District,
                SubDistrict: data.SubDistrict,
                Province: data.Province,
                Zipcode: data.Zipcode,
                Phone: data.Phone,
                Email: data.Email,
                City: data.City,
            })
            if (createCalendar) {
                ctx.body = {
                    status: 200,
                    message: 'success'
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail'
                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    },
    async getInvoice(ctx, _next) {
        try {
            const { query } = ctx
            const queryOptions = getPagination(query.page - 1, query.limit)
            const invoiceResult = await invoice.findAll({
                ...queryOptions,
            })
            console.log(invoiceResult)
            const result = invoiceResult.map(item => {
                console.log(JSON.parse(item.item))
                const invoiceData = {
                    Invoice_id: item.Invoice_id,
                    Date_Issued: item.Date_Issued,
                    Client_id: item.Client_id,
                    firstName: item.firstName,
                    LastName: item.LastName,
                    Email: item.Email,
                    TotalAmont: item.TotalAmont,
                    StatusProcess: item.process_status
                }
                return invoiceData
            })
            ctx.body = result
        } catch (err) {
            ctx.err;
        }
    },
    async updateCalendar(ctx, _next) {
        try {
            const data = ctx.request.body
            console.log(data.id)
            const updateProcess = await calendar.update({
                Appointment_date: data.AppointmentDate,
                FirstName: data.FirstName,
                LastName: data.LastName,
                HouseNo: data.HouseNo,
                Alley: data.Alley,
                District: data.District,
                SubDistrict: data.SubDistrict,
                Province: data.Province,
                Zipcode: data.Zipcode,
                Phone: data.Phone,
                Email: data.Email,
                City: data.City,
            }, {
                where: { id: data.id },
            });
            if (updateProcess) {
                ctx.body = {
                    status: 200,
                    message: 'success'
                }

            } else {
                ctx.body = {
                    status: 500,
                    message: "fail"

                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    },
    async updateExtra(ctx, _next) {
        try {
            const body = ctx.request.body
            console.log(body.invoiceId)
            console.log(body.extra)
            const updateProcess = await invoice.update({
                price_signcontact: body.priceSignContact,
                extra: JSON.stringify(body.extra)
            }, {
                where: { Invoice_id: body.invoiceId },
            }

            );
            if (updateProcess) {
                ctx.body = {
                    status: 200,
                    message: 'success'
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: "fail"
                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    },
    async destroyCalendar(ctx, _next) {
        try {
            const data = ctx.request.params
            const calendarResult = await calendar.destroy({
                where: { id: data.id },
            });
            console.log(calendarResult)
            calendarResult == 1 ?
                ctx.body = {
                    status: 200,
                    message: 'success'
                } : ctx.body = {
                    status: 500,
                    message: 'fail'
                }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    },
    async activeTier(ctx, _next) {
        try {
            const data = ctx.request.body
            const tierDataas = await tier.update(
                {
                    active: 0,
                }
                , {
                    where: {
                        id: { [Op.notIn]: [data.tierNum] }
                    }
                }
            );
            const tierDataa = await tier.update(
                {
                    active: data.active,
                }
                , {
                    where: {
                        tier_name: data.tierNum
                    }
                }
            );
            if (tierDataa && tierDataas) {
                ctx.body = {
                    status: 200,
                    message: 'success'
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail'
                }
            }
        } catch (err) {
        }
    },
    async addPriceTier(ctx, _next) {
        try {
            const data = ctx.request.body
            const addonFurniture = data.addonFurniture
            const addonBuildIn = data.addonBuildIn
            const addonFurnishings = data.addonFurnishings
            const dataItem = await item.create({
                item_name: data.name,
                minimumPriceFurniture: data.minimumPriceFurniture,
                minimumPriceBuildIn: data.minimumPriceBuildIn,
                tierName: data.tierName
            })
            if (data.material == "MultiChoice") {
                const dataMaterial = await material.findAll({
                })
                const dd = await dataMaterial.map(item => {
                    materialMarge = {
                        item_id: dataItem.dataValues.id,
                        material_id: item.id
                    }
                    return materialMarge
                })
                console.log(dd)
                await itemMaterial.bulkCreate(dd)
            } else if (data.material == "MDF" || data.material == "HMR" || data.material == "Regular") {
                const dataMaterial = await material.findOne({
                    where: {
                        material_name: data.material
                    }
                })
                await itemMaterial.create({
                    item_id: dataItem.dataValues.id,
                    material_id: dataMaterial.dataValues.id
                })
            }
            if (data.type == 'Furniture') {
                const saveFurniture = await furniturePrice.create({
                    item_id: dataItem.dataValues.id,
                    tier_id: data.tierName,
                    price: data.priceM,
                    type_id: 1
                })
                await itemType.create({
                    type_id: 1,
                    item_id: dataItem.dataValues.id,

                })
                if (addonFurniture.length == 0) {
                    await itemAddon.destroy({
                        where: {
                            item_id: dataItem.dataValues.id
                        }
                    })
                } else {
                    await addonFurniture.map((item) => {
                        itemAddon.create({
                            item_id: dataItem.dataValues.id,
                            addon_id: item.id,
                            type: 'furniture',
                            default: item.default
                        })
                    })
                }
                if (saveFurniture) {
                    ctx.body = {
                        status: 200,
                        message: 'success'
                    }
                }
            } else if (data.type == 'BuiltIn') {
                if (data.priceSqm2 !== 0) {
                    await buildInPrice.create({
                        price_rate: data.priceSqm2,
                        sqm_start: 0,
                        sqm_end: 2.45,
                        item_id: dataItem.dataValues.id,
                        tier_id: data.tierName,
                        type_id: 2
                    })
                }
                if (data.priceSqm3 !== 0) {
                    await buildInPrice.create({
                        price_rate: data.priceSqm3,
                        item_id: dataItem.dataValues.id,
                        tier_id: data.tierName,
                        sqm_start: 2.45,
                        sqm_end: 2.95,
                        type_id: 2
                    })
                }
                if (data.priceSqmNon !== 0) {
                    await buildInPrice.create({
                        price_rate: data.priceSqmNon,
                        item_id: dataItem.dataValues.id,
                        tier_id: data.tierName,
                        sqm_start: 3,
                        sqm_end: 10000,
                        type_id: 2
                    })
                }
                await itemType.create({
                    type_id: 2,
                    item_id: dataItem.dataValues.id,

                })

                if (addonBuildIn.length == 0) {
                    await itemAddon.destroy({
                        where: {
                            item_id: dataItem.dataValues.id
                        }
                    })
                } else {
                    await addonBuildIn.map((item) => {
                        itemAddon.create({
                            item_id: dataItem.dataValues.id,
                            addon_id: item.id,
                            type: 'buildIn',
                            default: item.default
                        })
                    })
                }
                // const addonDataResult = addonData.filter(addonData => addonData.addonDefault === 1);
                // if (addonDataResult.length !== 0) {
                //     await item.update({
                //         addon_default: addonDataResult[0].addonName
                //     }, {
                //         where: {
                //             id: dataItem.dataValues.id
                //         }
                //     })
                // }
            } else if (data.type == 'Furnishings') {
                await itemType.create({
                    type_id: 3,
                    item_id: dataItem.dataValues.id,
                })
                await addonFurnishings.map(item => {
                    itemAddon.create({
                        addon_id: item.id,
                        item_id: dataItem.dataValues.id,
                        type: 'Furnishings',
                        default: item.default
                    })
                })
            } else if (data.type == 'MultiChoice') {
                const saveFurniture = await furniturePrice.create({
                    tier_id: data.tierName,
                    price: data.priceM,
                    item_id: dataItem.dataValues.id,
                    type_id: 1
                })
                await buildInPrice.create({
                    price_rate: data.priceSqm2,
                    sqm_start: 0,
                    sqm_end: 2.45,
                    item_id: dataItem.dataValues.id,
                    tier_id: data.tierName,
                    type_id: 2
                })
                await buildInPrice.create({
                    price_rate: data.priceSqm3,
                    item_id: dataItem.dataValues.id,
                    tier_id: data.tierName,
                    sqm_start: 2.45,
                    sqm_end: 2.95,
                    type_id: 2
                })
                await buildInPrice.create({
                    price_rate: data.priceSqmNon,
                    item_id: dataItem.dataValues.id,
                    tier_id: data.tierName,
                    sqm_start: 3,
                    sqm_end: 10000,
                    type_id: 2
                })

                await addonFurniture.map(item => {
                    itemAddon.create({
                        addon_id: item.id,
                        item_id: dataItem.dataValues.id,
                        type: 'furniture',
                        default: item.default
                    })
                })
                await addonBuildIn.map(item => {
                    itemAddon.create({
                        addon_id: item.id,
                        item_id: dataItem.dataValues.id,
                        type: 'buildIn',
                        default: item.default
                    })
                })
                await itemType.create({
                    type_id: 1,
                    item_id: dataItem.dataValues.id,
                })
                await itemType.create({
                    type_id: 2,
                    item_id: dataItem.dataValues.id,
                })
                ctx.body = {
                    status: 200,
                    message: 'success'
                }
                return
            }
            ctx.body = {
                status: 200,
                message: 'success'
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    }
}
