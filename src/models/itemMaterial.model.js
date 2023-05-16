module.exports = (sequelize, Sequelize, config) => {
    const itemMaterial = sequelize.define(
        'item_material',
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
            material_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

        },
        config
    )
    itemMaterial.associate = model => {
        itemMaterial.hasOne(model.material, { foreignKey: 'id', targetKey: 'material_id', sourceKey: 'material_id' })
    }
    return itemMaterial
}
