const { client, invoice, maxCount } = require("../models");
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
    async getClient(ctx, _next) {
        try {
            const body = ctx.request.params
            console.log(body.restaurantId)
            const getClient = await client.findAll({ attributes: ['id', 'firstname', 'lastname'] })
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
    async searchClient(ctx, _next) {
        try {
            const { lt, like, eq, or, gt, ne, notIn } = Op
            const body = ctx.request.body
            console.log(body.keyword)
            const searchOptions = {
                [or]: {
                    firstName: {
                        [like]: `%${body.keyword}%`,
                    },
                    Phone: {
                        [like]: `%${body.keyword}%`,
                    },
                },
            }
            const getClient = await client.findAll({
                attributes: ['id',
                    'FirstName',
                    'LastName',
                    'HouseNo',
                    'TypeProject',
                    'ProjectName',
                    'Alley', 'District',
                    'SubDistrict', 'City', 'Provine', 'ZipCode', 'Phone', 'Line', 'Email'],
                where: { ...searchOptions }

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
    async filterClient(ctx, _next) {
        try {
            const { lt, like, eq, or, gt, ne, notIn } = Op
            const { query } = ctx

            console.log(query.project)
            console.log(query.status)

            if (query.project !== null) {
                const searchOptions = {
                    [or]: {
                        TypeProject: {
                            [like]: `%${query.project}%`,
                        },
                        // Phone: {
                        //     [like]: `%${body.firstName}%`,
                        // },
                    },
                }
                const getClient = await client.findAll({
                    attributes: ['id',
                        'FirstName',
                        'LastName',
                        'HouseNo',
                        'TypeProject',
                        'ProjectName',
                        'Alley', 'District',
                        'SubDistrict', 'City', 'Provine', 'ZipCode', 'Phone', 'Line', 'Email'],
                    where: { ...searchOptions }
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
            } else if (query.status) {


                const getClient = await invoice.findAll({
                    attributes: ['Invoice_id',
                        'Firstname',
                        'Lastname',
                        'HouseNo',
                        // 'TypeProject',
                        // 'ProjectName',
                        'Alley', 'District',
                        'SubDistrict', 'City', 'Provine', 'ZipCode', 'Phone', 'Email'],
                    where: {
                        process_status: query.status,
                    },
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
    async getAllClient(ctx, _next) {
        try {
            const body = ctx.request.params
            console.log(body.restaurantId)
            const getClient = await client.findAll({
                attributes: {

                    exclude: ['Provine']
                }

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

    async getClientById(ctx, _next) {
        try {
            const body = ctx.request.params
            console.log(body.restaurantId)
            const getClient = await client.findOne({
                where: {
                    id: body.clientId
                }
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
            const updateClient = await client.update({
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
    async addClient(ctx, _next) {
        try {
            const maxData = await maxCount.findOne({
            })
            // console.log(maxData.dataValues.max)
            const num = (maxData.dataValues.max + 1)
            // console.log(num)
            const genNum = new Date().getFullYear().toString().substring(2)

            const numMonth = (new Date().getMonth() + 1).toString().padStart(2, "0")

            const numGen = genNum + numMonth + String(num).padStart(6, '0')
            console.log(numGen)

            await maxCount.update({
                max: num
            },
                {
                    where: {
                        id: 1

                    }
                })


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
                Email: data.Email,
                clientId: numGen
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
    async destroyClient(ctx, _next) {
        try {
            const data = ctx.request.params
            const promotionResult = await client.destroy({
                where: { id: data.id },
            });
            console.log(promotionResult)
            promotionResult == 1 ? ctx.body = { result: "detroy client success" } : ctx.body = { result: "detroy client fail" }
        } catch (err) {
            ctx.err;
        }
    }
};
