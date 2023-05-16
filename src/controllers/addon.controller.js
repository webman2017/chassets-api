const { addon } = require("../models");
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
// const itemAddonModel = require("../models/itemAddon.model");
module.exports = {
    async getAddon(ctx, _next) {
        try {
            const getAddon = await addon.findAll({
                attributes: {
                    exclude: ['pricePermatre']
                },
                // attributes: ['id', ['add_on', 'addonName'], 'price', ['percent', 'per']],
            })
            console.log(getAddon)
            ctx.body = {
                status: 200,
                data: getAddon
            }
        } catch (err) {
        }
    },
    async addAddOn(ctx, _next) {
        const data = ctx.request.body
        console.log(data)
        try {
            const addAddon = await addon.create({
                add_on: data.addonName,
                price: data.price,
                percent: data.percent,
                type: data.percent,
                materialAddon: data.materialAddon,
                type: data.type,
            })
            if (addAddon) {
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
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err,
            }
        }
    },
    async updateAddOn(ctx, _next) {
        try {
            const data = ctx.request.body
            const addAddon = await addon.update({
                add_on: data.addonName,
                price: data.price,
                percent: data.percent,
                type: data.type,
                materialAddon: data.materialAddon,
            }, {
                where: {
                    id: data.id
                }
            }
            )
            if (addAddon) {
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
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err,
            }
        }
    },
    async destroyAddon(ctx, _next) {
        try {
            const data = ctx.request.params
            const addonResult = await addon.destroy({
                where: { id: data.id },
            });
            if (addonResult) {
                ctx.body = {
                    status: 200,
                    message: 'success'
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail',
                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err,
            }
        }
    }
};
