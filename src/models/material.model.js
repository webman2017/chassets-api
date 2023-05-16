module.exports = (sequelize, Sequelize, config) => {
    const material = sequelize.define(
        'material',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            material_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            percent: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

        },
        config
    )
    material.associate = model => {
        material.belongsTo(model.itemMaterial, { foreignKey: 'id', targetKey: 'material_id', sourceKey: 'material_id' })
        // addOn.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
    }
    return material
}
