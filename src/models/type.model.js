module.exports = (sequelize, Sequelize, config) => {
    const type = sequelize.define(
        'type',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            type_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            active: {
                type: Sequelize.STRING,
                allowNull: true,
            },


        },
        config
    )
    type.associate = model => {
        // item.belongsTo(model.itemAddon, { foreignKey: 'item_id', sourceKey: 'id' })
        type.hasMany(model.itemType, { foreignKey: 'type_id', targetKey: 'type_id', sourceKey: 'id' })
        // item.belongsTo(model.furniturePrice, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // item.belongsTo(model.buildInPrice, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
    }
    return type
}
