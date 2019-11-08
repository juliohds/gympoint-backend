import {
  startOfDay,
  subDays,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { id: student_id } = req.params;

    if (!student_id) {
      return res.status(404).json({ error: 'Student id is missing' });
    }

    const checkin = await Checkin.findAll({ where: { student_id } });
    return res.json(checkin);
  }

  async store(req, res) {
    const { id: student_id } = req.params;

    if (!student_id) {
      return res.status(404).json({ error: 'Student id is missing' });
    }

    const todayDate = new Date();
    const last7DaysDate = subDays(new Date(), 7);

    const checkinCount = await Checkin.findAndCountAll({
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

    const checkin = await Checkin.create({ student_id });
    return res.json(checkin);
  }
}

export default new CheckinController();
