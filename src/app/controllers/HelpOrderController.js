import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const helpOrder = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    });
    return res.json(helpOrder);
  }

  async store(req, res) {
    const { id: student_id } = req.params;

    if (!student_id) {
      return res.status(404).json({ error: 'Student id is missing' });
    }

    const todayDate = new Date();
    const last7DaysDate = subDays(new Date(), 7);

    const checkinCount = await HelpOrder.findAndCountAll({
      where: {
        student_id,
        createdAt: {
          [Op.between]: [last7DaysDate, todayDate],
        },
      },
    });

    if (checkinCount.count >= 5) {
      return res.status(404).json({ error: 'Max 5 checkins in the week' });
    }

    const checkin = await HelpOrder.create({ student_id });
    return res.json(checkin);
  }
}

export default new HelpOrderController();
