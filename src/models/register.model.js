module.exports = (sequelize, Sequelize, config) => {
    const user = sequelize.define(
        'user',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                //  defaultValue: Sequelize.INTEGER,

                autoIncrement: true,
            },
            fullname: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            line_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            create_at: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        config
    )
    user.associate = model => {
    }
    return user
}
