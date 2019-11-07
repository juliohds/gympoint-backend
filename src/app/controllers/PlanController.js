import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const plans = await Plan.findByPk(id);

    if (!plans) {
      return res.status(404).json({ error: 'Plan do not exists' });
    }

    await plans.update(req.body);
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(404).json({ error: 'Validation fails' });
    }

    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Plan.destroy({
      where: {
        id,
      },
    });
    return res.json({ message: 'Deleted with successful' });
  }
}

export default new PlanController();
