module.exports = (sequelize, Sequelize, config) => {
    const tUsers = sequelize.define(
        'TUsers',
        {
            UserId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            UserName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            FirstName_TH: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            RoleId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            RoleName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            LastName_TH: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            FirstName_EN: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            LastName_EN: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            PhoneNo: {
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
            Status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            LineId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            State: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Zip: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Country: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: true,
            }


        },
        config
    )
    tUsers.associate = model => {
        //  addOn.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return tUsers
}
