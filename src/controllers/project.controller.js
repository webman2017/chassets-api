const { project, projectName } = require("../models");
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

    async getProjectNameData(ctx, _next) {
        try {
            const getProjectName = await projectName.findAll(
                { attributes: ['id', 'ProjectName', 'TypeProject'] }

            )
            if (getProjectName) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: getProjectName
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: "fail",
                }
            }
        } catch (err) {
        }
    },

    async getProjectById(ctx, _next) {
        const data = ctx.request.params
        const ProjectName = await projectName.findOne({
            attributes: { exclude: ['Provine'] },
            where: {
                id: data.id,
            }
        })
        if (ProjectName) {
            ctx.body = {
                status: 200,
                message: "success",
                data: ProjectName
            }
        } else {
            ctx.body = {
                status: 500,
                message: "fail",
            }
        }
    },

    async getByProjectType(ctx, _next) {
        try {
            const data = ctx.request.body
            const getProjectName = await projectName.findAll({
                attributes: ['id', 'ProjectName', 'Alley', 'District', 'SubDistrict', 'City', 'Zipcode', 'TypeProject'],
                where: {
                    TypeProject: data.ProjectType,
                }
            })




            if (getProjectName) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: getProjectName
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: "fail",
                }
            }
        } catch (err) {
        }
    },


    async getProjectName(ctx, _next) {
        try {
            const getProjectName = await projectName.findAll({
                attributes: { exclude: ['Provine'] }
            })
            if (getProjectName) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: getProjectName
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: "fail",
                }
            }
        } catch (err) {
        }
    },
    async updateProjectName(ctx, _next) {
        try {
            const data = ctx.request.body
            const updateProject = await projectName.update({
                ProjectName: data.ProjectName,
                Alley: data.Alley,
                District: data.District,
                SubDistrict: data.SubDistrict,
                City: data.City,
                // Provine: data.Provine,
                Zipcode: data.Zipcode,
                TypeProject: data.TypeProject,
            }, {
                where: {
                    id: data.id,
                }
            })
            if (updateProject) {
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
        }
    },
    async destroyProjectName(ctx, _next) {
        const data = ctx.request.params
        const destroyProjectName = await projectName.destroy({
            where: {
                id: data.id,
            }
        })
        if (destroyProjectName) {
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
    },
    async addProjectName(ctx, _next) {
        try {
            const data = ctx.request.body
            const dataProjectName = await projectName.create({
                ProjectName: data.ProjectName,
                Alley: data.Alley,
                District: data.District,
                SubDistrict: data.SubDistrict,
                City: data.City,
                // Provine: data.Provine,
                Zipcode: data.Zipcode,
                TypeProject: data.TypeProject,
            })
            if (dataProjectName) {
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
        }
    },
    // async destroyProject(ctx, _next) {
    //     const data = ctx.request.params
    // },
    async getProject(ctx, _next) {
        try {
            // const body = ctx.request.params
            // console.log(body.restaurantId)
            const getProject = await project.findAll({})
            if (getProject) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: getProject
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
    async addProject(ctx, _next) {
        try {
            const data = ctx.request.body
            console.log(data)
            const createClient = await project.create({
                project_type: data.projectName,
                active: 1
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
    async updateProject(ctx, _next) {
        try {
            const idData = ctx.request.body
            console.log(idData.id)
            const updateProject = await project.update({
                project_type: idData.projectName,
                active: 1
            }, {
                where: {
                    id: idData.id,
                }
            })
            if (updateProject) {
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
    async destroyProject(ctx, _next) {
        try {
            const data = ctx.request.params
            const promotionResult = await project.destroy({
                where: { id: data.id },
            });
            console.log(promotionResult)
            promotionResult == 1 ? ctx.body = { result: "detroy project type success" } : ctx.body = { result: "detroy project type fail" }
        } catch (err) {
            ctx.err;
        }
    }
};
