import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
  async login(req, res) {
    const { login: username, password } = req.body;

    // For the given username fetch user from DB
    const mockedUsername = 'julio';
    const mockedPassword = '1234';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        const token = jwt.sign({ username }, authConfig.secret, {
          expiresIn: '24h',
        });
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token,
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Incorrect username or password',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Authentication failed! Please check the request',
      });
    }
  }
}

export default new SessionController();
