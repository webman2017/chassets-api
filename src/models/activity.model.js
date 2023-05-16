module.exports = (sequelize, Sequelize, config) => {
    const activity = sequelize.define(
        'activity',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            event: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            create_date: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            invoice_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            message: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        config
    )
    activity.associate = model => {
        //  addOn.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return activity
}
