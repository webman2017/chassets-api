module.exports = (sequelize, Sequelize, config) => {
    const tearFurniture = sequelize.define(
        'tear_furniture',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            type_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            item_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            active: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        },
        config
    )
    tearFurniture.associate = model => {
    }
    return tearFurniture
}
