module.exports = (sequelize, Sequelize, config) => {
    const tearFurniture = sequelize.define(
        'tear_furniture',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            type_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            item_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            active: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            tier_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        },
        config
    )
    tearFurniture.associate = model => {

        tearFurniture.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
    }
    return tearFurniture
}
