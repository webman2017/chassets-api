const { mRole } = require("../models");
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
const { create, countBy } = require("lodash");
module.exports = {
    async getRole(ctx, _next) {
        try {
            const tUsersData = await mRole.findAll({
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
    async addRole(ctx, _next) {
        try {
            const data = ctx.request.body
            const saveData = await mRole.create({
                RoleName: data.RoleName,
                IsCreate: data.IsCreate,
                IsRead: data.IsRead,
                IsWrite: data.IsWrite,
                CreateBy: data.CreateBy,
                CreateByName: data.CreateByName
                // RoleId: data.RoleId,
                // LastName_TH: data.LastName_TH,
                // FirstName_EN: data.FirstName_EN,
                // LastName_EN: data.LastName_EN,
                // Email: data.Email,
                // PhoneNo: data.PhoneNo,
                // CreateOn: data.CreateOn,
                // CreateBy: data.CreateBy,
                // CreateByName: data.CreateByName
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
        } catch (err) {
        }
    },
    async updateRole(ctx, _next) {
        const data = ctx.request.body
        // console.log(data)
        const saveData = await mRole.update({
            // UserId: data.UserId,
            RoleName: data.RoleName,
            IsCreate: data.IsCreate,
            IsRead: data.IsRead,
            IsWrite: data.IsWrite,
        }, {
            where: {
                RoleId: data.RoleId,
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
    },
    async detroyRole(ctx, _next) {
        try {
            const data = ctx.request.params
            const result = await mRole.destroy({
                where: {
                    RoleId: data.roleId
                }
            }
            )
            if (result) {
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
                data: []

            }
        }
    },
};
