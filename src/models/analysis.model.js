module.exports = (sequelize, Sequelize, config) => {
    const analysis = sequelize.define(
        'analysis',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            total_sale: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            month: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            year: {
                type: Sequelize.STRING,
                allowNull: true,
            },

        },
        config
    )
    analysis.associate = model => {
        //  addOn.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return analysis
}
