const { invoice, activity } = require("../models");
const Sequelize = require("sequelize");
const { ClientBase } = require("pg");
const twilio = require("twilio");
const { uuid } = require('uuidv4');
const jwt = require("jsonwebtoken");
const { secret } = require("../configs");
const moment = require("moment");
const { getPagination } = require('./../utils/common.utils')
const Op = Sequelize.Op;
const start = Date.now();
const path = require('path');
const { request } = require("http");
const __basedir = path.resolve();
const fs = require("fs");
const { create } = require("lodash");
var CurrentDate = moment();
const current = moment(CurrentDate).format('YYYY-MM-DD HH:mm:ss');
module.exports = {
    async getInvoiceById(ctx, _next) {
        try {
            const body = ctx.request.params
            console.log(body.invoiceId)
            const invoiceResult = await invoice.findOne({
                where: { Invoice_id: body.invoiceId },
            });

            let quotationId = ''
            if (invoiceResult.dataValues.quotation_id === null) {
                quotationId = ''
            } else {
                quotationId = (invoiceResult.dataValues.quotation_id).substring(0, 4) + (invoiceResult.dataValues.quotation_id).substring(8, 4) + (invoiceResult.dataValues.quotation_id).substring(24, 20)


            }

            // console.log(quotationId)
            // return
            // console.log(invoiceResult.dataValues)
            const invoiceData = {
                Invoice_id: invoiceResult.dataValues.Invoice_id,
                Date_Issued: invoiceResult.dataValues.Date_Issued,
                Date_Due: invoiceResult.dataValues.Date_Due,
                Client_id: invoiceResult.dataValues.Client_id,
                firstName: invoiceResult.dataValues.firstName,
                LastName: invoiceResult.dataValues.LastName,
                HouseNo: invoiceResult.dataValues.HouseNo,
                Alley: invoiceResult.dataValues.Alley,
                District: invoiceResult.dataValues.District,
                SubDistrict: invoiceResult.dataValues.SubDistrict,
                City: invoiceResult.dataValues.City,
                // Provine: invoiceResult.dataValues.Provine,
                Zipcode: invoiceResult.dataValues.Zipcode,
                Phone: invoiceResult.dataValues.Phone,
                Email: invoiceResult.dataValues.Email,
                item: JSON.parse(invoiceResult.dataValues.item),
                SubtotalPrice: invoiceResult.dataValues.SubtotalPrice,
                AdditionalPrice: invoiceResult.dataValues.AdditionalPrice,
                MaterialPrice: invoiceResult.dataValues.MaterialPrice,
                TotalAmont: invoiceResult.dataValues.TotalAmont,
                Bank: invoiceResult.dataValues.Bank,
                Salesperson: invoiceResult.dataValues.Salesperson,
                StatusProcess: invoiceResult.dataValues.process_status,
                priceSignContact: invoiceResult.dataValues.price_signcontact,
                Extra: JSON.parse(invoiceResult.dataValues.extra),
                quotationId: quotationId
            }
            if (invoiceData) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: invoiceData
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail',
                    data: []
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


    async getInvoiceByQuotationId(ctx, _next) {
        try {
            const body = ctx.request.params
            console.log(body.quotationId)

            const invoiceResult = await invoice.findOne({

                // attributes: [
                //     [Sequelize.fn('CONCAT', Sequelize.fn('SUBSTRING', Sequelize.col('quotation_id'), 5, 6), Sequelize.fn('SUBSTRING', Sequelize.col('quotation_id'), 21, 4)), 'quotation_id'],
                // ],

                where: Sequelize.where(Sequelize.fn('CONCAT', Sequelize.fn('SUBSTRING', Sequelize.col('quotation_id'), 1, 8), Sequelize.fn('SUBSTRING', Sequelize.col('quotation_id'), 21, 4)), body.quotationId)




                // where: 






            })
            // console.log(invoiceResult)


            // ctx.body = invoiceResult
            quotationId = (invoiceResult.dataValues.quotation_id).substring(0, 4) + (invoiceResult.dataValues.quotation_id).substring(8, 4) + (invoiceResult.dataValues.quotation_id).substring(24, 20)
            // return
            const invoiceData = {
                Invoice_id: invoiceResult.dataValues.Invoice_id,
                Date_Issued: invoiceResult.dataValues.Date_Issued,
                Date_Due: invoiceResult.dataValues.Date_Due,
                Client_id: invoiceResult.dataValues.Client_id,
                firstName: invoiceResult.dataValues.firstName,
                LastName: invoiceResult.dataValues.LastName,
                HouseNo: invoiceResult.dataValues.HouseNo,
                Alley: invoiceResult.dataValues.Alley,
                District: invoiceResult.dataValues.District,
                SubDistrict: invoiceResult.dataValues.SubDistrict,
                City: invoiceResult.dataValues.City,
                // Provine: invoiceResult.dataValues.Provine,
                Zipcode: invoiceResult.dataValues.Zipcode,
                Phone: invoiceResult.dataValues.Phone,
                Email: invoiceResult.dataValues.Email,
                item: JSON.parse(invoiceResult.dataValues.item),
                SubtotalPrice: invoiceResult.dataValues.SubtotalPrice,
                AdditionalPrice: invoiceResult.dataValues.AdditionalPrice,
                MaterialPrice: invoiceResult.dataValues.MaterialPrice,
                TotalAmont: invoiceResult.dataValues.TotalAmont,
                Bank: invoiceResult.dataValues.Bank,
                Salesperson: invoiceResult.dataValues.Salesperson,
                StatusProcess: invoiceResult.dataValues.process_status,
                priceSignContact: invoiceResult.dataValues.price_signcontact,
                ProjectName: invoiceResult.dataValues.ProjectName,
                Extra: JSON.parse(invoiceResult.dataValues.extra),
                quotationId: quotationId,
                quotation_id: invoiceResult.dataValues.quotation_id
            }
            if (invoiceData) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: invoiceData
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail',
                    data: []
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

    async getInvoice(ctx, _next) {
        try {
            const { query } = ctx
            console.log(query.page)
            // return
            let queryOptions = ''
            if (query.page === undefined && query.limit === undefined) {
                queryOptions = ''
            } else {
                queryOptions = getPagination(query.page - 1, query.limit)

            }

            const invoiceResult = await invoice.findAll({
                ...queryOptions,
            })
            // console.log(invoiceResult)
            const result = invoiceResult.map(item => {
                let quotationId = ''
                if (item.quotation_id !== null) {
                    quotationId = item.quotation_id.substring(0, 8) + item.quotation_id.substring(20, 24)
                }


                // console.log(quotationId)

                // return
                // console.log(JSON.parse(item.item))
                const invoiceData = {
                    Invoice_id: item.Invoice_id,
                    Date_Issued: item.Date_Issued,
                    Client_id: item.Client_id,
                    firstName: item.firstName,
                    LastName: item.LastName,
                    Email: item.Email,
                    TotalAmont: item.TotalAmont,
                    StatusProcess: item.process_status,
                    quotationId: quotationId
                    // QuotationId: (item.quotation_id).substring(10, 4) + (item.quotation_id).substring(24, 20)
                }
                return invoiceData
            })
            ctx.body = result
        } catch (err) {
            ctx.err;
        }
    },
    async updateProcess(ctx, _next) {
        try {
            const body = ctx.request.body
            console.log(body.invoiceId)
            const updateProcess = await invoice.update({
                process_status: body.process
            }, {
                where: { Invoice_id: body.invoiceId },
            });
            if (updateProcess) {

                const data = await activity.create({
                    invoice_id: body.invoiceId,
                    event: 'Quatation has been update process',
                    create_date: current,
                    message: 'Quatation number' + body.invoiceId
                })
                ctx.body = {
                    status: 200,
                    message: 'success'
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: "fail"

                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    },
    async updateExtra(ctx, _next) {
        try {
            const body = ctx.request.body
            console.log(body.invoiceId)
            console.log(body.extra)
            const updateProcess = await invoice.update({
                price_signcontact: body.priceSignContact,
                extra: JSON.stringify(body.extra)
            }, {
                where: { Invoice_id: body.invoiceId },
            }
            );
            if (body.priceSignContact) {
                const data = await activity.create({
                    invoice_id: body.invoiceId,
                    event: 'Quatation has been Deposited',
                    create_date: current,
                    message: 'Quatation number' + body.invoiceId
                })
            }
            if (body.extra) {
                const data = await activity.create({
                    invoice_id: body.invoiceId,
                    event: 'Quatation has been extra',
                    create_date: current,
                    message: 'Quatation number' + body.invoiceId
                })
            }
            if (updateProcess) {
                ctx.body = {
                    status: 200,
                    message: 'success'
                }

            } else {
                ctx.body = {
                    status: 500,
                    message: "fail"
                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    },
    async addInvoice(ctx, _next) {
        try {
            const data = ctx.request.body
            // console.log(JSON.stringify(data.item))
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            function generateString(length) {
                let result = ' ';
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }
            const inputstartdate = moment(data.Date_Issued).format('YYYY-MM-DD HH:mm:ss');
            const inputduedate = moment(data.Date_Due).format('YYYY-MM-DD HH:mm:ss');
            console.log(generateString(5));
            const numMonth = (new Date().getMonth() + 1).toString().padStart(2, "0")
            const date = new Date().getDate().toString().padStart(2, "0")
            const createClient = await invoice.create({
                Date_Issued: inputstartdate,
                Date_Due: inputduedate,
                Client_id: data.Client_id,
                firstName: data.firstName,
                LastName: data.LastName,
                HouseNo: data.HouseNo,
                TypeProject: data.TypeProject,
                ProjectName: data.ProjectName,
                Alley: data.Alley,
                District: data.District,
                SubDistrict: data.SubDistrict,
                City: data.City,
                // Provine: data.Provine,
                Zipcode: data.Zipcode,
                Phone: data.Phone,
                Line: data.Line,
                Email: data.Email,
                item: data.item,
                generate_link: generateString(5),
                item: JSON.stringify(data.info),
                process_status: 'Quotation',
                SubtotalPrice: data.SubtotalPrice,
                AdditionalPrice: data.AdditionalPrice,
                MaterialPrice: data.MaterialPrice,
                TotalAmont: data.TotalAmont,
                Bank: data.Bank,
                Salesperson: data.Salesperson,
                quotation_id: 'CH' + new Date().getFullYear() + numMonth + date + '-' + uuid()
            })

            console.log(createClient.dataValues.Invoice_id)
            const activityData = await activity.create({
                invoice_id: createClient.dataValues.Invoice_id,
                event: 'Quatation has been generated',
                create_date: current,
                message: 'Quatation number' + createClient.dataValues.Invoice_id
            })


            if (createClient) {
                let quotationIdGen = createClient.dataValues.quotation_id
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: {
                        invoiceId: createClient.dataValues.Invoice_id,
                        quotationId: 'CH' + quotationIdGen.substring(8, 2) + quotationIdGen.substring(24, 20),
                    }
                }
            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail'
                }
            }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    },
    async destroyInvoice(ctx, _next) {
        try {
            const data = ctx.request.params
            const promotionResult = await invoice.destroy({
                where: { Invoice_id: data.id },
            });
            console.log(promotionResult)
            promotionResult == 1 ?
                ctx.body = {
                    status: 200,
                    message: 'success'
                } : ctx.body = {
                    status: 500,
                    message: 'fail'
                }
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    },
    async searchInvoice(ctx, _next) {
        try {
            const { query } = ctx
            console.log(query.search)
            const { lat, lng } = query
            const { lt, like, eq, or, gt, ne, notIn } = Op
            const queryOptions = getPagination(query.page, query.limit)
            const searchOptions = query.search && {
                [or]: {
                    Invoice_id: {
                        [like]: `%${query.search}%`,
                    },
                    firstName: {
                        [like]: `%${query.search}%`,
                    },
                },
            }
            const invoiceData = await invoice.findAll({
                attributes: ['Invoice_id', 'Date_Issued', 'Client_id', 'firstName', 'LastName', 'Email', 'TotalAmont', 'process_status'],
                // ...queryOptions,
                where: { ...searchOptions }

            })
            console.log(invoiceData)
            ctx.body = invoiceData
        } catch (err) {
        }
    },
    async filterInvoice(ctx, _next) {
        try {
            const { query } = ctx
            console.log(query.status)
            console.log(query.dateStart)
            console.log(query.dateEnd)

            const startDate = moment("06/03/2022", 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
            const endDate = moment("12/12/2022", 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

            console.log(startDate)
            console.log(endDate)
            if (query.status) {
                const invoiceData = await invoice.findAll({
                    attributes: ['Invoice_id', 'Date_Issued', 'Client_id', 'firstName', 'LastName', 'Email', 'TotalAmont', 'process_status'],
                    // ...queryOptions,
                    where: { process_status: query.status }
                })
                ctx.body = invoiceData
            } else if (query.dateStart && query.dateEnd) {
                const invoiceData = await invoice.findAll({
                    attributes: ['Invoice_id', 'Date_Issued', 'Client_id', 'firstName', 'LastName', 'Email', 'TotalAmont', 'process_status'],
                    where: {
                        Date_Issued: {
                            [Op.lt]: new Date(new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1),
                            [Op.gt]: new Date(startDate)
                        }
                    }
                })
                console.log(invoiceData)
                ctx.body = invoiceData
            }
        } catch (err) {

        }
    }
}
