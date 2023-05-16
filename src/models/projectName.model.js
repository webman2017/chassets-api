module.exports = (sequelize, Sequelize, config) => {
    const projectName = sequelize.define(
        'project_name',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
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
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            SubDistrict: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            City: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Provine: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Zipcode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            TypeProject: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        config
    )
    projectName.associate = model => {
        //  addOn.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return projectName
}
