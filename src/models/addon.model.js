module.exports = (sequelize, Sequelize, config) => {
    const addOn = sequelize.define(
        'add_on',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            add_on: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            percent: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            materialAddon:
            {
                type: Sequelize.STRING,
                allowNull: true,
            },
            pricePermatre:
            {
                type: Sequelize.FLOAT,
                allowNull: true,
            },

        },
        config
    )
    addOn.associate = model => {
        // addOn.belongTo(model.item, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'addon_id' })
        addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
        // addOn.belongsTo(model.item, { foreignKey: 'addon_default', targetKey: 'addon_default', sourceKey: 'addon_id' })
    }
    return addOn
}
