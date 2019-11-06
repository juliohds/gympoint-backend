module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      year: Sequelize.INTEGER,
      weight: Sequelize.INTEGER,
      height: Sequelize.INTEGER,
      provider: Sequelize.BOOLEAN,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('students');
  },
};
