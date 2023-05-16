module.exports = (sequelize, Sequelize, config) => {
    const item = sequelize.define(
        'item',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            item_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            active: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            addon_default: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            material: {
                type: Sequelize.STRING,
                allowNull: true,
            },

        },
        config
    )
    item.associate = model => {
    }
    return item
}
