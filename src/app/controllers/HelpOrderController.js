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
    const { question } = req.body;
    if (!question) {
      return res.status(404).json({ error: 'Question is missing' });
    }

    const helpOrder = await HelpOrder.create({ student_id, question });
    return res.json(helpOrder);
  }

  async answer(req, res) {
    const { id } = req.params;
    const { answer } = req.body;
    if (!answer) {
      return res.status(404).json({ error: 'Answer is missing' });
    }
    const helpOrder = await HelpOrder.findByPk(id);
    await helpOrder.update({ answer, answer_at: new Date() });
    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
