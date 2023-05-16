module.exports = (sequelize, Sequelize, config) => {
    const parameterDetails = sequelize.define(
        'parameterDetails',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            parameterId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            heightStart: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },
            heightEnd: {
                type: Sequelize.FLOAT,
                allowNull: true,
            },

            heightUnit: {
                type: Sequelize.STRING,
                allowNull: true,
            },

        },
        config
    )
    parameterDetails.associate = model => {
        // parameterDetails.hasMany(model.parameter, { foreignKey: 'id', targetKey: 'parameterId', sourceKey: 'parameterId' })
    }
    return parameterDetails
}
