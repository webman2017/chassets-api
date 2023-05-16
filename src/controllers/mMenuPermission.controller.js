const { mMenuPermissions } = require("../models");
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
    async getMenu(ctx, _next) {
        try {
            const tUsersData = await mMenuPermissions.findAll({
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

    async detroyMenuPermission(ctx, _next) {
        try {
            const data = ctx.request.params
            console.log(data.PermissionId)
            const result = await mMenuPermissions.destroy({
                where: {
                    MenuId: data.PermissionId
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
    async addMenu(ctx, _next) {
        try {
            const data = ctx.request.body
            console.log(data)
            const saveData = await mMenuPermissions.create({
                MenuItemName: data.MenuItemName,
                ParentId: data.ParentId,
                Order: data.Order,
                Url: data.Url,
                MenuIcon: data.MenuIcon,
                // IsCreate: data.IsCreate,
                // IsRead: data.IsRead,
                // IsWrite: data.IsWrite,
                // CreateOn: data.CreateOn,
                // CreateBy: data.CreateBy,
                // CreateByName: data.CreateByName,
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
    async updateMenu(ctx, _next) {
        const data = ctx.request.body
        console.log(data)
        const saveData = await mMenuPermissions.update({
            // UserId: data.UserId,
            ParentId: data.ParentId,
            Order: data.Order,
            MenuItemName: data.MenuItemName,
            MenuIcon: data.MenuIcon,
            Url: data.Url,
            IsCreate: data.IsCreate,
            IsRead: data.IsRead,
            IsWrite: data.IsWrite,
            CreateBy: data.Order,
        }, {
            where: {
                MenuId: data.MenuId,
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
