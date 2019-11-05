import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async getAll(req, res) {
    const user = await User.findAll();
    return res.json({ user });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const { name, email, password } = await User.create(req.body);
    return res.status(201).json({ name, email, password });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (old, field) => (old ? field.required() : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);
    if (!user) return res.status(400).json({ error: 'User not exists' });

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);
    return res.json({ id, name, email, provider });
  }

  async getById(req, res) {
    const user = await User.findOne({ where: { id: req.params.id } });
    return res.json({ user });
  }
}

export default new UserController();
