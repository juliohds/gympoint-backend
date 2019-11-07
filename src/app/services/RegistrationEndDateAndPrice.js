import { addMonths } from 'date-fns';
import Plan from '../models/Plan';

export default async registration => {
  const { dataValues } = registration;

  const plan = await Plan.findByPk(dataValues.plan_id);

  dataValues.price = plan.price * plan.duration;
  dataValues.end_date = addMonths(Date.now(), plan.duration);

  return registration;
};
