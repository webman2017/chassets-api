const { buildInPrice, parameter, parameterDetails } = require("../models");
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
const { create } = require("lodash");
module.exports = {
    async getAll(ctx, _next) {
        const getAllParameter = await parameter.findAll({
            include: {
                model: parameterDetails, paranoid: false,
            },
        })
        const dataParameter = getAllParameter
        const data = await dataParameter.map(item => {
            let paramsdata = {
                id: item.dataValues.id,
                parameterGroupName: item.dataValues.parameterGroupName,
            }

            let i = 0
            let d
            let b = item.dataValues.parameterDetails.map(itemm => {
                i++

                d = {
                    [`parameterDetails${i}`]: {
                        heightStart: itemm.dataValues.heightStart,
                        heightEnd: itemm.dataValues.heightEnd,
                        heightUnit: itemm.dataValues.heightUnit,
                    }
                }
                return d
            })
            const obj3 = { ...paramsdata, ...b }
            return obj3
        })


        console.log(data)


        const newData = data.map(obj => {
            const values = Object.values(obj);
            const newObj = { id: obj.id, parameterGroupName: obj.parameterGroupName };
            values.forEach(value => {
                const key = Object.keys(value)[0];
                newObj[key] = value[key];
            });
            return newObj;
        });

        console.log(newData);


        ctx.body = {
            status: 200,
            message: 'success',
            data: newData

        }
        return

        ctx.body = {
            status: 200,
            message: 'success',
            data: getAllParameter
        }
    },
    async addParameter(ctx, _next) {
        try {
            const data = ctx.request.body
            const result = await parameter.create({
                parameterGroupName: data.parameterGroupName,
            })
            const parameterdetails1 = await parameterDetails.create({
                parameterId: result.dataValues.id,
                heightStart: data.parameterDetails1.heightStart,
                heightEnd: data.parameterDetails1.heightEnd,
                heightUnit: data.parameterDetails1.heightUnit,
            })
            const parameterdetails2 = await parameterDetails.create({
                parameterId: result.dataValues.id,
                heightStart: data.parameterDetails2.heightStart,
                heightEnd: data.parameterDetails2.heightEnd,
                heightUnit: data.parameterDetails2.heightUnit,
            })

            const parameterdetails3 = await parameterDetails.create({
                parameterId: result.dataValues.id,
                heightStart: data.parameterDetails3.heightStart,
                heightEnd: data.parameterDetails3.heightEnd,
                heightUnit: data.parameterDetails3.heightUnit,
            })
            if (result && parameterdetails1 && parameterdetails2 && parameterdetails3) {
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

    async destroyParameter(ctx, _next) {
        try {
            const data = ctx.request.params

            const result = await parameter.destroy({
                where: {
                    id: data.parameterGroupId
                }
            })
            const result1 = await parameterDetails.destroy({
                where: {
                    parameterId: data.parameterGroupId
                }
            })
            if (result && result1) {
                ctx.body = {
                    status: 200,
                    message: "Delete success"
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: "Delete fail"
                }

            }
        } catch (err) {

        }
    },



    async updateParameter(ctx, _next) {
        try {
            const data = ctx.request.body
            const result = await parameter.update({
                parameterGroupName: data.parameterGroupName,
            }, {
                where: {
                    id: data.id
                },
            }
            )
            const resultUpdate = await parameterDetails.destroy({
                where: {
                    parameterId: data.id
                }
            })

            const parameterdetails1 = await parameterDetails.create({
                parameterId: data.id,
                heightStart: data.parameterDetails1.heightStart,
                heightEnd: data.parameterDetails1.heightEnd,
                heightUnit: data.parameterDetails1.heightUnit,
            })
            const parameterdetails2 = await parameterDetails.create({
                parameterId: data.id,
                heightStart: data.parameterDetails2.heightStart,
                heightEnd: data.parameterDetails2.heightEnd,
                heightUnit: data.parameterDetails2.heightUnit,
            })

            const parameterdetails3 = await parameterDetails.create({
                parameterId: data.id,
                heightStart: data.parameterDetails3.heightStart,
                heightEnd: data.parameterDetails3.heightEnd,
                heightUnit: data.parameterDetails3.heightUnit,
            })

            if (result && parameterdetails1 && parameterdetails2 && parameterdetails3) {
                ctx.body = {
                    status: 200,
                    message: "Update success"
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: "Update fail"
                }
            }
        } catch (err) {

        }

    }
}
