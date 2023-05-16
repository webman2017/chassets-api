module.exports = (sequelize, Sequelize, config) => {
    const bank = sequelize.define(
        'bank',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,
                autoIncrement: true,
            },
            bank_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            bank_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            bank: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            logo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            logo_base64: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            default: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            qrcode: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        },
        config
    )
    bank.associate = model => {
        //  addOn.hasMany(model.item, { foreignKey: 'id', targetKey: 'item_id', sourceKey: 'item_id' })
        // addOn.hasMany(model.itemAddon, { foreignKey: 'addon_id', targetKey: 'addon_id', sourceKey: 'id' })
    }
    return bank
}
