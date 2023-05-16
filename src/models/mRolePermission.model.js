module.exports = (sequelize, Sequelize, config) => {
    const mRolePermission = sequelize.define(
        'MRolePermission',
        {
            RolePermissionId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            RoleId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            MenuId: {
                type: Sequelize.INTEGER,
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
        },
        config
    )
    mRolePermission.associate = model => {
        mRolePermission.belongsTo(model.mMenuPermissions, { as: 'menuItem', foreignKey: 'MenuId', targetKey: 'MenuId', sourceKey: 'MenuId' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return mRolePermission
}
