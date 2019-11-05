module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('files', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable('files');
    },
};
