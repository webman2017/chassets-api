const { invoice, calendar, client } = require("../models");
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
    async topFive(ctx, _next) {
        const data = await invoice.findAll({
            attributes: [
                'ProjectName',
                [Sequelize.fn('COUNT', Sequelize.col('Invoice_id')), 'Total'],
            ],
            // where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
            group: 'ProjectName',

            limit: 5
        })
        console.log(data)
        if (data) {
            ctx.body = {
                status: 200,
                message: 'success',
                data: data
            }
        } else {
            ctx.body = {
                status: 500,
                message: 'fail',
                data: []
            }
        }
    },

    async totalSaleTypeMonthly(ctx, _next) {
        const todaysDate = new Date()
        const currentYear = todaysDate.getFullYear()
        const currentMonth = todaysDate.getMonth() + 1
        const data = await invoice.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('TotalAmont')), 'TotalAmont'],
                [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
            ],
            where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
            group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
        })
        let total = 0
        if (data.length == 0 || data[0].dataValues.TotalAmont == null) {
            total = 0
        } else {
            total = data[0].dataValues.TotalAmont
        }
        const contact = await invoice.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('price_signcontact')), 'SignContactTotal'],
                [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
            ],
            where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
            group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
        })
        // console.log(contact[0].dataValues.SignContactTotal)
        // console.log(contact[0].dataValues.SignContactTotal)
        let contactData = 0
        if (contact.length == 0 || contact[0].dataValues.SignContactTotal == null) {
            contactData = 0
        } else {
            contactData = contact[0].dataValues.SignContactTotal
        }
        const forecast = await invoice.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('forecast')), 'foreCastTotal'],
                [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
            ],
            where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
            group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
        })
        let forecastData = 0
        if (forecast.length == 0 || forecast[0].dataValues.foreCastTotal == null) {
            forecastData = 0
        } else {
            forecastData = forecast[0].dataValues.foreCastTotal
        }
        const extraData = await invoice.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('extra')), 'extra'],
                [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
            ],
            where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
            group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
        })
        let extraTotal = 0
        if (extraData.length == 0 || extraData[0].dataValues.extra == null) {
            extraTotal = 0
        } else {
            extraTotal = extraData[0].dataValues.extra
        }
        // console.log(extraData[0].dataValues.extra)
        ctx.body = {
            status: 200,
            message: 'success',
            data: {
                TotalAmount: total,
                SignContactTotal: parseInt(contactData),
                extra: parseInt(extraTotal),
                forecastTotal: parseInt(forecastData),
                month: currentMonth,
                year: currentYear
            }
        }
    },
    async TotalSaleYear(ctx, _next) {
        try {
            // const body = ctx.request.params
            // console.log(body.restaurantId)
            const data = await invoice.findAll({
                attributes: [
                    // [Sequelize.fn('year', Sequelize.col('Date_Issued'))],
                    [Sequelize.fn('SUM', Sequelize.col('TotalAmont')), 'TotalAmont'],

                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year'],
                ],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued'))]
            })
            // console.log(data)
            // ctx.body = data
            // return
            if (data) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: data
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
    async TotalSaleMonthly(ctx, _next) {
        try {
            const todaysDate = new Date()
            const currentYear = todaysDate.getFullYear()
            const currentMonth = todaysDate.getMonth() + 1
            const data = await invoice.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('TotalAmont')), 'TotalAmont'],
                    [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
                ],
                where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
            })
            // console.log(data)
            // ctx.body = data
            // return
            if (data) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: data
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
    async TotalSaleCurrentlyYear(ctx, _next) {
        try {
            const todaysDate = new Date()
            const currentYear = todaysDate.getFullYear()
            const data = await invoice.findAll({
                attributes: ['extra',
                    [Sequelize.fn('SUM', Sequelize.col('TotalAmont')), 'TotalAmont'],
                    [Sequelize.fn('SUM', Sequelize.col('price_signcontact')), 'priceSigncontact'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year'],
                ],
                where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear),
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued'))]
            })
            if (data) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: data
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
    async TotalSaleYearType(ctx, _next) {
        try {
            const body = ctx.query
            const typeData = body.type
            // console.log(typeData)
            if (typeData == 'forecast') {
                const dataType = await invoice.findAll({
                    attributes: [
                        [Sequelize.fn('SUM', Sequelize.col('forecast')), 'forecast'],
                        [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year'],
                    ],
                    group: [Sequelize.fn('year', Sequelize.col('Date_Issued'))]
                })
                const forecastData = dataType.map(item => {
                    // console.log(item)
                    let ff = 0
                    item.dataValues.forecast == null ? 0 : ff = item.dataValues.forecast

                    const data = {
                        forecast: parseInt(ff),
                        year: item.dataValues.year
                    }

                    return data
                })


                // console.log(forecastData)
                // return
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: forecastData
                    // data: {
                    //     forecast: parseInt(dataType[0].dataValues.forecast),
                    //     year: dataType[0].dataValues.year
                    // }
                }
            } else if (typeData == 'signContact') {
                const dataSignContact = await invoice.findAll({
                    attributes: [
                        [Sequelize.fn('SUM', Sequelize.col('price_signcontact')), 'priceSigncontact'],
                        [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year'],
                    ],
                    group: [Sequelize.fn('year', Sequelize.col('Date_Issued'))]
                })


                const signContactData = dataSignContact.map(item => {
                    // console.log(item)
                    let ff = 0
                    item.dataValues.priceSigncontact == null ? 0 : ff = item.dataValues.priceSigncontact

                    const data = {
                        priceSigncontact: parseInt(ff),
                        year: item.dataValues.year
                    }

                    return data
                })




                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: signContactData
                    // data: {
                    //     priceSigncontact: parseInt(dataSignContact[0].dataValues.priceSigncontact),
                    //     year: dataSignContact[0].dataValues.year
                    // }
                    // data: dataSignContact
                }


            } else if (typeData == 'extra') {
                const dataExtra = await invoice.findAll({
                    attributes: ['extra',
                        // [Sequelize.fn('SUM', Sequelize.col('price_signcontact')), 'priceSigncontact'],
                        [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year'],
                    ],
                    group: [Sequelize.fn('year', Sequelize.col('Date_Issued'))]
                })
                // ctx.body = dataExtra
                // console.log(dataExtra)
                const extraData = dataExtra.map(item => {
                    // console.log(item)
                    let ff = 0
                    item.dataValues.extra == null ? 0 : ff = item.dataValues.extra

                    const data = {
                        extra: parseInt(ff),
                        year: item.dataValues.year
                    }

                    return data
                })

                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: extraData
                    // data: {
                    //     extra: parseInt(dataExtra[0].dataValues.extra),
                    //     year: dataExtra[0].dataValues.year
                    // }
                }

            }
            return

            // console.log(body.restaurantId)
            const data = await invoice.findAll({
                attributes: [
                    // [Sequelize.fn('year', Sequelize.col('Date_Issued'))],
                    [Sequelize.fn('SUM', Sequelize.col('TotalAmont')), 'TotalAmont'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year'],
                ],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), '']
            })

            console.log(data)


            ctx.body = data

            // return
            if (data) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: data
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

    async clientDepositYearly(ctx, _next) {
        try {
            const data = await invoice.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('deposit')), 'deposit'],

                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year'],
                ],
                //  where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear),
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued'))]
            })

            if (data) {

                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: data
                }


            } else {
                ctx.body = {
                    status: 500,
                    message: 'fail',

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






    async totalSaleMonth(ctx, _next) {
        try {
            // const body = ctx.request.params
            // console.log(body.restaurantId)
            const data = await invoice.findAll({
                attributes: [
                    // [Sequelize.fn('year', Sequelize.col('Date_Issued'))],
                    [Sequelize.fn('SUM', Sequelize.col('TotalAmont')), 'TotalAmont'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'Date_Issued'],
                ],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued'))]
            })

            console.log(data)
            return




            const getClient = await invoice.findAll({})
            if (getClient) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    // data: getClienttotal:0,
                    data: [
                        {
                            month: 'Jan.',
                            values: 40
                        },
                        {
                            month: 'Feb.',
                            values: 60
                        },
                        {
                            month: 'Mar.',
                            values: 50
                        },
                        {
                            month: 'Apr.',
                            values: 90
                        }
                    ]

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
    async overview(ctx, _next) {
        try {
            const dataType = await invoice.findAll({
                include:
                {
                    model: client, paranoid: false,
                },
                attributes: ['Client_id',
                    [Sequelize.fn('COUNT', Sequelize.col('Invoice_id')), 'countInvoice'],
                ],
                group: 'clients.TypeProject'
            })
            const countData = await dataType.map(item => {
                const typeProject = item.dataValues.clients[0].dataValues.TypeProject
                const resultData = parseInt(item.dataValues.countInvoice)
                return resultData
            })
            // console.log(countData)
            // return
            ctx.body = {
                status: 200,
                message: "success",
                data: [{
                    Condominium: 1,
                    Enterprise: 1,
                    House: 1,
                    IndividualHouse: 1,
                    Other: 1,
                    TownHome: 2
                }]

            }
            return
            ctx.body = {
                status: 200,
                message: 'success',

                data: [{
                    House: 1,
                    TownHome: 2,
                    Condominium: 2,
                    IndividualHouse: 3,
                    Enterprise: 4,
                    Other: 5
                }]
            }
            return
            // console.log(body.restaurantId)
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


    // async updateClient(ctx, _next) {
    //     try {
    //         const idData = ctx.request.body
    //         console.log(idData.id)
    //         const updateClient = await client.update({
    //             FirstName: idData.FirstName,
    //             LastName: idData.LastName,
    //             HouseNo: idData.HouseNo,
    //             TypeProject: idData.TypeProject,
    //             ProjectName: idData.ProjectName,
    //             Alley: idData.Alley,
    //             District: idData.District,
    //             SubDistrict: idData.SubDistrict,
    //             City: idData.City,
    //             Provine: idData.Provine,
    //             Zipcode: idData.Zipcode,
    //             SubDistrict: idData.SubDistrict,
    //             Phone: idData.Phone,
    //             Line: idData.Line,
    //             Email: idData.Email,
    //         }, {
    //             where: {
    //                 id: idData.id
    //             }
    //         })
    //         if (updateClient) {
    //             ctx.body = {
    //                 status: 200,
    //                 message: "success",

    //             }
    //         } else {
    //             ctx.body = {
    //                 status: 500,
    //                 message: "fail",

    //             }
    //         }
    //     } catch (err) {
    //         ctx.err;
    //         ctx.body = {
    //             status: 500,
    //             message: err,

    //         }
    //     }
    // },
    async addActivity(ctx, _next) {
        try {
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
                Email: data.Email
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


    async TotalDepositAmount(ctx, _next) {
        try {
            const todaysDate = new Date()
            const currentYear = todaysDate.getFullYear()
            const currentMonth = todaysDate.getMonth() + 1
            const data = await invoice.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('deposit')), 'deposit'],
                    [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
                ],
                where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
            })
            // console.log(data)
            // ctx.body = data
            // return
            if (data) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: data
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

    async TotalDepositCount(ctx, _next) {
        try {
            const todaysDate = new Date()
            const currentYear = todaysDate.getFullYear()
            const currentMonth = todaysDate.getMonth() + 1
            const data = await invoice.findAll({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('deposit')), 'deposit'],
                    [Sequelize.fn('month', Sequelize.col('Date_Issued')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Date_Issued')), 'year']
                ],
                where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Date_Issued')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Date_Issued')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Date_Issued')), Sequelize.fn('month', Sequelize.col('Date_Issued'))]
            })
            // console.log(data)
            // ctx.body = data
            // return
            if (data) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: data
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

    async TotalAppointment(ctx, _next) {
        try {
            const todaysDate = new Date()
            const currentYear = todaysDate.getFullYear()
            const currentMonth = todaysDate.getMonth() + 1
            const data = await calendar.findAll({
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
                    [Sequelize.fn('month', Sequelize.col('Appointment_date')), 'month'],
                    [Sequelize.fn('year', Sequelize.col('Appointment_date')), 'year']
                ],
                where: [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('Appointment_date')), currentYear), Sequelize.where(Sequelize.fn('month', Sequelize.col('Appointment_date')), currentMonth)],
                group: [Sequelize.fn('year', Sequelize.col('Appointment_date')), Sequelize.fn('month', Sequelize.col('Appointment_date'))]
            })
            // console.log(data)
            // ctx.body = data
            // return
            if (data) {
                ctx.body = {
                    status: 200,
                    message: "success",
                    data: data
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

};
