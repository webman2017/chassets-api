const { calendar } = require("../models");
const Sequelize = require("sequelize");
const { ClientBase } = require("pg");
const twilio = require("twilio");
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
module.exports = {
    async getCalendar(ctx, _next) {
        try {
            const calendarData = await calendar.findAll({
            });

            if (calendar) {
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: calendarData
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
    async addCalendar(ctx, _next) {
        try {
            const data = ctx.request.body
            // console.log(data)
            const createCalendar = await calendar.create({
                Appointment_date: data.AppointmentDate,
                FirstName: data.FirstName,
                LastName: data.LastName,
                HouseNo: data.HouseNo,
                Alley: data.Alley,
                District: data.District,
                SubDistrict: data.SubDistrict,
                Province: data.Province,
                Zipcode: data.Zipcode,
                Phone: data.Phone,
                Email: data.Email,
                City: data.City,
            })
            if (createCalendar) {
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
        } catch (err) {
            ctx.err;
            ctx.body = {
                status: 500,
                message: err
            }
        }
    },





    async getInvoice(ctx, _next) {
        try {
            const { query } = ctx
            const queryOptions = getPagination(query.page - 1, query.limit)
            const invoiceResult = await invoice.findAll({
                ...queryOptions,
            })
            console.log(invoiceResult)
            const result = invoiceResult.map(item => {
                console.log(JSON.parse(item.item))
                const invoiceData = {
                    Invoice_id: item.Invoice_id,
                    Date_Issued: item.Date_Issued,
                    Client_id: item.Client_id,
                    firstName: item.firstName,
                    LastName: item.LastName,
                    Email: item.Email,
                    TotalAmont: item.TotalAmont,
                    StatusProcess: item.process_status
                }
                return invoiceData
            })
            ctx.body = result
        } catch (err) {
            ctx.err;
        }
    },

    async updateCalendar(ctx, _next) {
        try {
            const data = ctx.request.body
            console.log(data.id)
            const updateProcess = await calendar.update({
                Appointment_date: data.AppointmentDate,
                FirstName: data.FirstName,
                LastName: data.LastName,
                HouseNo: data.HouseNo,
                Alley: data.Alley,
                District: data.District,
                SubDistrict: data.SubDistrict,
                Province: data.Province,
                Zipcode: data.Zipcode,
                Phone: data.Phone,
                Email: data.Email,
                City: data.City,
            }, {
                where: { id: data.id },
            }

            );
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

    async destroyCalendar(ctx, _next) {
        try {
            const data = ctx.request.params
            const calendarResult = await calendar.destroy({
                where: { id: data.id },
            });
            console.log(calendarResult)
            calendarResult == 1 ?
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
    // async searchInvoice(ctx, _next) {
    //     try {
    //         const { query } = ctx
    //         console.log(query.search)
    //         const { lat, lng } = query
    //         const { lt, like, eq, or, gt, ne, notIn } = Op
    //         const queryOptions = getPagination(query.page, query.limit)
    //         const searchOptions = query.search && {
    //             [or]: {
    //                 Invoice_id: {
    //                     [like]: `%${query.search}%`,
    //                 },
    //                 firstName: {
    //                     [like]: `%${query.search}%`,
    //                 },
    //             },
    //         }
    //         const invoiceData = await invoice.findAll({
    //             attributes: ['Invoice_id', 'Date_Issued', 'Client_id', 'firstName', 'LastName', 'Email', 'TotalAmont', 'process_status'],
    //             // ...queryOptions,
    //             where: { ...searchOptions }

    //         })
    //         console.log(invoiceData)
    //         ctx.body = invoiceData
    //     } catch (err) {
    //     }
    // },
    // async filterInvoice(ctx, _next) {
    //     try {
    //         const { query } = ctx
    //         console.log(query.status)
    //         console.log(query.dateStart)
    //         console.log(query.dateEnd)

    //         const startDate = moment("06/03/2022", 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
    //         const endDate = moment("12/12/2022", 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

    //         console.log(startDate)
    //         console.log(endDate)

    //         // console.log(inputstartdate)
    //         // return
    //         if (query.status) {
    //             const invoiceData = await invoice.findAll({
    //                 attributes: ['Invoice_id', 'Date_Issued', 'Client_id', 'firstName', 'LastName', 'Email', 'TotalAmont', 'process_status'],
    //                 // ...queryOptions,
    //                 where: { process_status: query.status }
    //             })
    //             ctx.body = invoiceData
    //         } else if (query.dateStart && query.dateEnd) {
    //             // let startDate = "2022-03-06";
    //             // let endDate = "2022-05-12";
    //             // let startDate = "06/03/2022";
    //             // let endDate = "12/12/2022";

    //             const invoiceData = await invoice.findAll({
    //                 attributes: ['Invoice_id', 'Date_Issued', 'Client_id', 'firstName', 'LastName', 'Email', 'TotalAmont', 'process_status'],
    //                 where: {
    //                     Date_Issued: {
    //                         [Op.lt]: new Date(new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1),
    //                         [Op.gt]: new Date(startDate)
    //                     }
    //                 }
    //             })
    //             console.log(invoiceData)
    //             ctx.body = invoiceData
    //         }
    //     } catch (err) {

    //     }
    // }
}
