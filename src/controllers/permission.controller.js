const { tUsers, mMenuPermissions, mRolePermission, mRole } = require("../models");
const Sequelize = require("sequelize");
const moment = require("moment");
const Op = Sequelize.Op;
module.exports = {
    async getUserProfile(ctx, _next) {
        try {
            const data = ctx.request.params
            const userId = data.UserId
            console.log(userId)
            const tUsersData = await tUsers.findAll({
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

    async getAllUser(ctx, _next) {
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
    async getPermissionByRoleId(ctx, _next) {
        try {
            const data = ctx.request.params
            console.log(data.RoleId)
            const permissionData = await mRolePermission.findAll({
                // attributes: ['RolePermissionId', 'RoleId', 'MenuId', 'IsRead', 'IsWrite', 'IsCreate'],
                include: [{
                    model: mMenuPermissions, as: "menuItem", paranoid: false,
                    // attributes: ['Url', 'MenuIcon', 'MenuItemName', 'IsRead', 'IsWrite', 'IsCreate']
                }],
                where: {
                    RoleId: data.RoleId,
                },
            })
            if (permissionData) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: permissionData
                }
            } else {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: []
                }
            }
        } catch (err) {
        }
    },

    async detroyRolePermission(ctx, _next) {
    },
    async getAllPermission(ctx, _next) {
        try {
            // const data = ctx.request.params
            // const userId = data.RoleId
            const permissionData = await mRolePermission.findAll({
                include: [{
                    model: mMenuPermissions, as: "menuItem", paranoid: false
                }]

            })
            if (permissionData) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: permissionData
                }
            } else {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: []
                }
            }
        } catch (err) {

        }
    },
    async addPermission(ctx, _next) {
        try {
            const data = ctx.request.body
            const permissionData = data.Permissions
            const result = await permissionData.map(item => {
                console.log(item.MenuId)
                let res = {
                    RoleId: data.RoleId,
                    MenuId: item.MenuId
                }
                const checkExist = mRolePermission.findOne({
                    where: {
                        RoleId: data.RoleId,
                        MenuId: item.MenuId
                    }
                })
                checkExist.then(function (result) {
                    if (result) {
                    } else {
                        mRolePermission.create({
                            RoleId: data.RoleId,
                            MenuId: item.MenuId,
                            IsCreate: item.IsCreate,
                            IsRead: item.IsRead,
                            IsWrite: item.IsWrite,
                        })
                    }

                })
            })
            ctx.body = {
                status: 200,
                message: 'success'
            }
        } catch (err) {
        }
    },
    async updatePermission(ctx, _next) {
        const data = ctx.request.body
        const permissionData = data.Permissions
        await mRolePermission.destroy({
            where: {
                RoleId: data.RoleId
            }
        })
        const result = await permissionData.map(item => {
            mRolePermission.create({
                RoleId: data.RoleId,
                MenuId: item.MenuId,
                IsCreate: item.IsCreate,
                IsRead: item.IsRead,
                IsWrite: item.IsWrite,
            })
        })
        if (result) {
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
