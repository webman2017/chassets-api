module.exports = (sequelize, Sequelize, config) => {
    const calendar = sequelize.define(
        'calendar',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            Appointment_date: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            FirstName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            LastName: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            HouseNo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Alley: {
                type: Sequelize.INTEGER,
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
            Province: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Zipcode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            City: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        config
    )
    calendar.associate = model => {
        //  addOn.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return calendar
}
