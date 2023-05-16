module.exports = (sequelize, Sequelize, config) => {
    const itemAddon = sequelize.define(
        'item_addon',
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

            addon_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            default: {
                type: Sequelize.INTEGER,
                allowNull: true,
            }

        },
        config
    )
    itemAddon.associate = model => {
        itemAddon.belongsTo(model.addon, { foreignKey: 'addon_id', targetKey: 'id', sourceKey: 'id' })
        itemAddon.hasMany(model.item, { foreignKey: 'id', targetKey: 'id', sourceKey: 'id' })
        // itemAddon.belongsTo(model.restaurantMenuGroup, { foreignKey: 'menu_id', targetKey: 'restaurant_menu_id', sourceKey: 'menu_id' })
    }
    return itemAddon
}
