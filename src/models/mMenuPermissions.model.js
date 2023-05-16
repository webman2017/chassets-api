module.exports = (sequelize, Sequelize, config) => {
    const mMenuPermissions = sequelize.define(
        'MMenuPermissions',
        {
            MenuId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            ParentId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            Order: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            MenuItemName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            MenuIcon: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Url: {
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
            CreateOn: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            CreateBy: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            CreateByName: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            UpdateOn: {
                type: Sequelize.STRING,
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
        },
        config
    )
    mMenuPermissions.associate = model => {
        mMenuPermissions.hasMany(model.mRolePermission, { foreignKey: 'MenuId', targetKey: 'MenuId', sourceKey: 'MenuId' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return mMenuPermissions
}
