module.exports = (sequelize, Sequelize, config) => {
    const mRole = sequelize.define(
        'MRole',
        {
            RoleId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            RoleName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            CreateOn: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            CreateBy: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            CreateByName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            UpdateOn: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            UpdateBy: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            UpdateByName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            IsCreate: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            IsRead: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            IsWrite: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        },
        config
    )
    mRole.associate = model => {
        //  addOn.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return mRole
}
