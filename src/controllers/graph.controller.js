const { invoice } = require("../models");
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
    async graphTotalEaring(ctx, _next) {
        try {
            const todaysDate = new Date()
            const currentYear = todaysDate.getFullYear()
            const currentMonth = todaysDate.getMonth() + 1
            const data = await invoice.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('TotalAmont')), 'TotalAmont'],
                    [Sequelize.fn('SUM', Sequelize.col('price_signcontact')), 'signContact'],
                    'extra',

                    [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
                ],
                where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
            })
            const result = await data.map(item => {
                let dataResult = {
                    TotalAmont: item.dataValues.TotalAmont,
                    priceSigncontact: item.dataValues.signContact,
                    month: item.dataValues.month,
                    year: item.dataValues.year,
                    extra: JSON.parse(item.extra)
                }
                return dataResult
            })
            if (data) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: result
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
    async clientReport(ctx, _next) {
        try {
            const data = await invoice.findAll({
                attributes: [
                    'Client_id',
                    [Sequelize.fn('COUNT', Sequelize.col('Invoice_id')), 'invoiceid'],
                ],
                group: ['Client_id']
            })
            const dataDeposit = await invoice.findAll({
                attributes: [
                    'Client_id',
                    [Sequelize.fn('COUNT', Sequelize.col('Invoice_id')), 'invoiceid'],
                ],
                where: {
                    deposit: {

                        [Op.ne]: null
                    }
                },
                group: ['Client_id']
            })

            const dataSignContact = await invoice.findAll({
                attributes: [
                    'Client_id',
                    [Sequelize.fn('COUNT', Sequelize.col('Invoice_id')), 'invoiceid'],
                ],
                where: {
                    price_signcontact: {
                        [Op.ne]: null
                    }
                },
                group: ['Client_id']
            })

            const resultDeposit = await dataDeposit.map(item => {
                let sum = 0
                sum = parseInt(sum) + parseInt(item.dataValues.invoiceid)
                return sum
            })
            // console.log(resultDeposit.reduce((a, b) => a + b, 0))
            let deposit = resultDeposit.reduce((a, b) => a + b, 0)
            // return
            const result = await data.map(item => {
                let sum = 0
                sum = parseInt(sum) + parseInt(item.dataValues.invoiceid)
                return sum
            })
            // console.log(result.reduce((a, b) => a + b, 0))
            let all = result.reduce((a, b) => a + b, 0)


            const resultSignContact = await dataSignContact.map(item => {
                let sum = 0
                sum = parseInt(sum) + parseInt(item.dataValues.invoiceid)
                return sum
            })
            // console.log(resultSignContact.reduce((a, b) => a + b, 0))
            let signContact = resultSignContact.reduce((a, b) => a + b, 0)



            if (data && dataDeposit && dataSignContact) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    deposit: deposit,
                    all: all,
                    signContact: signContact
                }
            }



            return
            if (data) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: sum
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
    }
};
