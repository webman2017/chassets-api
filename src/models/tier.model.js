module.exports = (sequelize, Sequelize, config) => {
    const tier = sequelize.define(
        'tier',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            tier_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            active: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            parameterId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        },
        config
    )
    tier.associate = model => {
        tier.hasOne(model.parameter, { foreignKey: 'id', targetKey: 'id', sourceKey: 'parameterId' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return tier
}
