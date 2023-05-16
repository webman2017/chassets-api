module.exports = (sequelize, Sequelize, config) => {
    const client = sequelize.define(
        'client',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,

                autoIncrement: true,
            },
            FirstName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            LastName: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            HouseNo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            TypeProject: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            ProjectName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Alley: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            District: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            SubDistrict: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            City: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            Provine: {
                type: Sequelize.STRING,
            },
            Zipcode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Line: {
                type: Sequelize.STRING,
                allowNull: true,

            },
            Email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            clientId: {
                type: Sequelize.STRING,
                allowNull: true,
            }
        },
        config
    )
    client.associate = model => {
        client.belongsTo(model.invoice, { foreignKey: 'id', targetKey: 'Client_id', sourceKey: 'id' })
        // promotions.belongsTo(model.promotion_menu, { foreignKey: 'id', targetKey: 'promotion_id', sourceKey: 'promotion_id' })
    }
    return client
}
