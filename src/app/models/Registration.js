import Sequelize, { Model } from 'sequelize';
import RegistrationEndDateAndPrice from '../services/RegistrationEndDateAndPrice';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async registration => {
      if (registration.start_date) {
        await RegistrationEndDateAndPrice(registration);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });
    this.belongsTo(models.Plan, {
      foreignKey: 'plan_id',
      as: 'plan',
    });
  }
}
export default Registration;
