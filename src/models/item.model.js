module.exports = (sequelize, Sequelize, config) => {
    const item = sequelize.define(
        'item',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            item_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            active: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            addon_default: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            material: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            minimumPrice: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            minimumPriceFurniture: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            minimumPriceBuildIn: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            tierName: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        },
        config
    )
    item.associate = model => {
        // item.belongsTo(model.itemAddon, { foreignKey: 'item_id', sourceKey: 'id' })
        // item.hasMany(model.addon, { foreignKey: 'addon_default', targetKey: 'addon_id', sourceKey: 'addon_id' })
        item.belongsTo(model.itemAddon, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        item.belongsTo(model.furniturePrice, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        item.belongsTo(model.buildInPrice, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
    }
    return item
}
