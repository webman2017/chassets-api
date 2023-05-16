module.exports = (sequelize, Sequelize, config) => {
    const itemType = sequelize.define(
        'item_type',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            type_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

        },
        config
    )
    itemType.associate = model => {
        // item.belongsTo(model.itemAddon, { foreignKey: 'item_id', sourceKey: 'id' })
        itemType.belongsTo(model.type, { foreignKey: 'type_id', targetKey: 'id', sourceKey: 'id' })
        // item.belongsTo(model.furniturePrice, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // item.belongsTo(model.buildInPrice, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
    }
    return itemType
}
