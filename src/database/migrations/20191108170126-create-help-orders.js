module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('help-users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: { model: 'students', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      question: Sequelize.STRING,
      answer: Sequelize.STRING,
      answer_at: Sequelize.DATE,

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('help-users');
  },
};
