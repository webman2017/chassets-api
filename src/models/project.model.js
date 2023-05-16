module.exports = (sequelize, Sequelize, config) => {
    const projectType = sequelize.define(
        'project_type',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            project_type: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            active: {
                type: Sequelize.INTEGER,
                allowNull: true,
            }
        },
        config
    )
    projectType.associate = model => {
        //  addOn.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return projectType
}
