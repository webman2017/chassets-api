module.exports = (sequelize, Sequelize, config) => {
    const max = sequelize.define(
        'max_count',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            max: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        },
        config
    )
    max.associate = model => {
    }
    return max
}
