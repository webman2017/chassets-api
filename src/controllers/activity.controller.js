const { activity } = require("../models");
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
    async getActivity(ctx, _next) {
        try {
            // const body = ctx.request.params
            // console.log(body.restaurantId)
            const getActivity = await activity.findAll({})
            if (getActivity) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: getActivity
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
    async getActivityUser(ctx, _next) {
        try {
            const body = ctx.request.params
            console.log(body.userId)
            const getActivity = await activity.findAll({
                where: {
                    user_id: body.userId
                }
            })
            if (getActivity) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: getActivity
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
    // async updateClient(ctx, _next) {
    //     try {
    //         const idData = ctx.request.body
    //         console.log(idData.id)
    //         const updateClient = await client.update({
    //             FirstName: idData.FirstName,
    //             LastName: idData.LastName,
    //             HouseNo: idData.HouseNo,
    //             TypeProject: idData.TypeProject,
    //             ProjectName: idData.ProjectName,
    //             Alley: idData.Alley,
    //             District: idData.District,
    //             SubDistrict: idData.SubDistrict,
    //             City: idData.City,
    //             Provine: idData.Provine,
    //             Zipcode: idData.Zipcode,
    //             SubDistrict: idData.SubDistrict,
    //             Phone: idData.Phone,
    //             Line: idData.Line,
    //             Email: idData.Email,
    //         }, {
    //             where: {
    //                 id: idData.id
    //             }
    //         })
    //         if (updateClient) {
    //             ctx.body = {
    //                 status: 200,
    //                 message: "success",

    //             }
    //         } else {
    //             ctx.body = {
    //                 status: 500,
    //                 message: "fail",

    //             }
    //         }
    //     } catch (err) {
    //         ctx.err;
    //         ctx.body = {
    //             status: 500,
    //             message: err,

    //         }
    //     }
    // },
    async addActivity(ctx, _next) {
        try {
            const data = ctx.request.body
            console.log(data)
            const createClient = await client.create({
                FirstName: data.FirstName,
                LastName: data.LastName,
                HouseNo: data.HouseNo,
                TypeProject: data.TypeProject,
                ProjectName: data.ProjectName,
                Alley: data.Alley,
                District: data.District,
                SubDistrict: data.SubDistrict,
                City: data.City,
                Provine: data.Provine,
                Zipcode: data.Zipcode,
                Phone: data.Phone,
                Line: data.Line,
                Email: data.Email
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
    // async destroyClient(ctx, _next) {
    //     try {
    //         const data = ctx.request.params
    //         const promotionResult = await client.destroy({
    //             where: { id: data.id },
    //         });
    //         console.log(promotionResult)
    //         promotionResult == 1 ? ctx.body = { result: "detroy client success" } : ctx.body = { result: "detroy client fail" }
    //     } catch (err) {
    //         ctx.err;
    //     }
    // }
};
