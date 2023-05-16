module.exports = (sequelize, Sequelize, config) => {
    const parameter = sequelize.define(
        'parameters',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            parameterGroupName: {
                type: Sequelize.STRING,
                allowNull: true,
            }
        },
        config
    )
    parameter.associate = model => {
        parameter.hasMany(model.parameterDetails, { foreignKey: 'parameterId', targetKey: 'id', sourceKey: 'id' })
        parameter.belongsTo(model.tier, { foreignKey: 'id', targetKey: 'id', sourceKey: 'id' })
    }
    return parameter
}
