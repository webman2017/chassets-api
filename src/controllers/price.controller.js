const { price, buildInPrice } = require("../models");
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
const { create } = require("lodash");
module.exports = {
    async getTearFurniture(ctx, _next) {
        try {
            const idData = ctx.request.body
            const typeId = idData.type
            console.log(typeId)
            if (typeId == 1) {
                const tearFurnitureData = await price.findAll({
                })

                if (tearFurnitureData) {
                    ctx.body = {
                        status: 200,
                        message: "success",
                        data: tearFurnitureData
                    }
                } else {
                    ctx.body = {
                        status: 500,
                        message: err,
                        data: []
                    }
                }
            } else if (typeId == 2) {
                const buildInPriceData = await buildInPrice.findAll({
                })
                if (buildInPriceData) {
                    ctx.body = {
                        status: 200,
                        message: "success",
                        data: buildInPriceData
                    }
                } else {
                    ctx.body = {
                        status: 500,
                        message: err,
                        data: []
                    }
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'ค่าที่ส่งไม่ถูกต้อง',

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

};
