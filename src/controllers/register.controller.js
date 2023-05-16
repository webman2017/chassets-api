const { register, maxCount, tUsers } = require("../models");
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



const bcrypt = require('bcryptjs');

module.exports = {
    async getClient(ctx, _next) {
        try {
            const body = ctx.request.params
            console.log(body.restaurantId)
            const getClient = await register.findAll({
            })

            if (getClient) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: getClient
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
    async updateClient(ctx, _next) {
        try {
            const idData = ctx.request.body
            console.log(idData.id)
            const updateClient = await register.update({
                FirstName: idData.FirstName,
                LastName: idData.LastName,
                HouseNo: idData.HouseNo,
                TypeProject: idData.TypeProject,
                ProjectName: idData.ProjectName,
                Alley: idData.Alley,
                District: idData.District,
                SubDistrict: idData.SubDistrict,
                City: idData.City,
                Provine: idData.Provine,
                Zipcode: idData.Zipcode,
                SubDistrict: idData.SubDistrict,
                Phone: idData.Phone,
                Line: idData.Line,
                Email: idData.Email,
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
    async register(ctx, _next) {
        try {
            // return
            const data = ctx.request.body
            const passwordData = bcrypt.hashSync(data.Password, 10)
            const findUsernamne = await tUsers.findOne({
                where: {
                    UserName: data.username,
                },
            });
            if (findUsernamne) {
                ctx.body = {
                    status: 200,
                    message: "username นี้มีอยู่แล้ว",
                }
            } else {
                const createClient = await tUsers.create({
                    FirstName_EN: data.FullName,
                    Email: data.Email,
                    LineId: data.LineID,
                    UserName: data.username,
                    PhoneNo: data.Phone,
                    Password: passwordData,
                    Status: data.status,

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
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err,

            }
        }
    },
    async destroyClient(ctx, _next) {
        try {
            const data = ctx.request.params
            const promotionResult = await register.destroy({
                where: { id: data.id },
            });
            console.log(promotionResult)
            promotionResult == 1 ? ctx.body = { result: "detroy client success" } : ctx.body = { result: "detroy client fail" }
        } catch (err) {
            ctx.err;
        }
    },
    async login(ctx, _next) {
        const data = ctx.request.body
        const findLogin = await tUsers.findOne({
            where: {
                UserName: data.username,
            },
        });
        console.log(findLogin.dataValues.Password)
        // console.log(data)
        // return
        if (!findLogin || !bcrypt.compareSync(data.password, findLogin.dataValues.Password)) {
            ctx.body = {
                status: 500,
                message: "unauthorized",
                data: []
            }
        } else {
            const tokenData = jwt.sign(data, "Stack", {
                expiresIn: '10h' // expires in 10 Hour
            });
            ctx.body = {
                status: 200,
                message: "success",
                data: findLogin,
                token: tokenData
            }
        }
    }
};
