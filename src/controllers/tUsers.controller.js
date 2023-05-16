const { tUsers, mMenuPermissions, maxCount } = require("../models");
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
const bcrypt = require('bcryptjs');
const { create, countBy } = require("lodash");
module.exports = {
    async getUser(ctx, _next) {
        try {
            const tUsersData = await tUsers.findAll({
            }
            )
            ctx.body = {
                status: 200,
                message: "success",
                data: tUsersData
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
    async getUserById(ctx, _next) {
        try {
            const data = ctx.request.params
            const userId = data.UserId
            // console.log(userId)
            const tUsersData = await tUsers.findOne({
                where: {
                    UserId: userId
                }
            }
            )
            ctx.body = {
                status: 200,
                message: "success",
                data: tUsersData
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
    async getMenuItem(ctx, _next) {
        try {
            const data = ctx.request.params
            const userId = data.UserId
            console.log(userId)
            // const tUsersData = await mMenuPermissions.findAll({
            //     where: {
            //         UserId: userId
            //     }
            // }
            // )
            // ctx.body = {
            //     status: 200,
            //     message: "success",
            //     data: tUsersData
            // }
        } catch (err) {

        }

    },
    async addUser(ctx, _next) {
        try {
            const data = ctx.request.body
            console.log(data)
            const findLogin = await tUsers.findOne({
                where: {
                    UserName: data.UserName,
                },
            });
            if (!findLogin) {
                const maxData = await maxCount.findOne({
                })

                const num = (maxData.dataValues.max + 1)
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
                const passwordData = bcrypt.hashSync(data.Password, 10)
                const saveData = await tUsers.create({
                    UserName: data.UserName,
                    FirstName_TH: data.FirstName_TH,
                    Password: passwordData,
                    RoleId: data.RoleId,
                    RoleName: data.RoleName,
                    LastName_TH: data.LastName_TH,
                    LineId: data.LineId,
                    FirstName_EN: data.FirstName_EN,
                    LastName_EN: data.LastName_EN,
                    Email: data.Email,
                    PhoneNo: data.PhoneNo,
                    CreateOn: data.CreateOn,
                    CreateBy: data.CreateBy,
                    CreateByName: data.CreateByName,
                    user_id: numGen
                })

                if (saveData) {
                    ctx.body = {
                        status: 200,
                        message: 'success',

                    }
                } else {
                    ctx.body = {
                        status: 500,
                        message: 'fail'
                    }
                }
            } else {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: 'user name exist'
                }
            }

        } catch (err) {
        }
    },
    async updateUser(ctx, _next) {
        const data = ctx.request.body
        console.log(data)
        const saveData = await tUsers.update({
            // UserId: data.UserId,
            UserName: data.UserName,
            FirstName_TH: data.FirstName_TH,
            RoleId: data.RoleId,
            RoleName: data.RoleName,
            LastName_TH: data.LastName_TH,
            FirstName_EN: data.FirstName_EN,
            LastName_EN: data.LastName_EN,
            Email: data.Email,
            PhoneNo: data.PhoneNo,
            CreateOn: data.CreateOn,
            CreateBy: data.CreateBy,
            CreateByName: data.CreateByName
        }, {
            where: {
                UserId: data.UserId,
            }
        }
        )

        if (saveData) {
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
    },
    async deleteUser(ctx, _next) {
        const data = ctx.request.params
        console.log(data)
        const saveData = await tUsers.destroy({
            where: {
                UserId: data.UserId,
            }
        })

        if (saveData) {
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
    }






};
