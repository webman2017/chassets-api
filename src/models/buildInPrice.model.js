module.exports = (sequelize, Sequelize, config) => {
    const tearBuildIn = sequelize.define(
        'tear_build_in',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            sqm_start: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            sqm_end: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            price_rate: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            type_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            tier_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            heightUnit: {
                type: Sequelize.INTEGER,
                allowNull: true,
            }
        },
        config
    )
    tearBuildIn.associate = model => {
        tearBuildIn.hasOne(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
    }
    return tearBuildIn
}
