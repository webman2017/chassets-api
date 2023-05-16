module.exports = (sequelize, Sequelize, config) => {
    const invoice = sequelize.define(
        'invoice',
        {
            Invoice_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            Date_Issued: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            HouseNo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Alley: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Date_Due: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Client_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            LastName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            District: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            SubDistrict: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            City: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Provine: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            Zipcode: {
                type: Sequelize.STRING,
            },

            Phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            item: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            generate_link: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            process_status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            SubtotalPrice: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            AdditionalPrice: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            MaterialPrice: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            TotalAmont: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            Bank: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            ProjectName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Salesperson: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            price_signcontact: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            extra: {
                type: Sequelize.TEXT('long'),
                allowNull: true,
            },
            deposit: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            forecast: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            quotation_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },

        },
        config
    )
    invoice.associate = model => {
        invoice.hasMany(model.client, { foreignKey: 'id', targetKey: 'id', sourceKey: 'Client_id' })
        // promotions.belongsTo(model.promotion_menu, { foreignKey: 'id', targetKey: 'promotion_id', sourceKey: 'promotion_id' })
    }
    return invoice
}
