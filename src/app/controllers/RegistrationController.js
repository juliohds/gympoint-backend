import * as Yup from 'yup';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      include: [
        {
          model: Student,
          as: 'student',
        },
        {
          model: Plan,
          as: 'plan',
        },
      ],
    });
    return res.json(registrations);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const registrations = await Registration.findByPk(id);

    if (!registrations) {
      return res.status(404).json({ error: 'Registration do not exists' });
    }

    await registrations.update(req.body);
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Validation fails' });
    }

    const registration = await Registration.create(req.body);

    const plan = await Plan.findByPk(registration.plan_id);
    const student = await Student.findByPk(registration.student_id);

    registration.plan = plan;
    // await Queue.add(RegistrationMail.key, {
    //   registration,
    // });

    return res.json(registration);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Registration.destroy({
      where: {
        id,
      },
    });
    return res.json({ message: 'Deleted with successful' });
  }
}

export default new RegistrationController();
