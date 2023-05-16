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
    async TotalSale(ctx, _next) {
        try {
            const todaysDate = new Date()
            const currentYear = todaysDate.getFullYear()
            const currentMonth = todaysDate.getMonth() + 1
            const data = await invoice.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('TotalAmont')), 'TotalAmont'],
                    [Sequelize.fn('COUNT', Sequelize.col('Invoice_id')), 'count'],
                    [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
                ],
                // where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
            })
            const signContact = await invoice.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('price_signcontact')), 'price_signcontact'],
                    [Sequelize.fn('COUNT', Sequelize.col('price_signcontact')), 'count'],
                    [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
                ],
                // where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
            })
            const extra = await invoice.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('extra')), 'extra'],
                    [Sequelize.fn('COUNT', Sequelize.col('extra')), 'countExtra'],
                    [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
                ],
                // where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
            })
            const forecast = await invoice.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('forecast')), 'forecast'],
                    [Sequelize.fn('COUNT', Sequelize.col('forecast')), 'countForcast'],
                    [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
                ],
                // where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
            })
            const type = await invoice.findAll({
                attributes: [
                    // 'project_type',
                    'type',
                    // [Sequelize.fn('SUM', Sequelize.col('forecast')), 'forecast'],
                    [Sequelize.fn('COUNT', Sequelize.col('type')), 'type'],
                    [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
                ],
                // include:
                // {
                //     model: invoice, paranoid: false,
                // },
                // where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('type'))]
            })
            ctx.body = {
                totalSale: data,
                signContact: signContact,
                extra: extra,
                forecast: forecast,
                deposit: '',
                deposit5000: '',
                deposit10000: '',
                type: type
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
