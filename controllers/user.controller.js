const userService = require('../service/user.service');
const config = require('config');

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({
        acceseToken: userData.accessToken,
        user: { ...userData.user },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res, next) {
    try {
    } catch (e) {}
  }

  async logout(req, res, next) {
    try {
    } catch (e) {}
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(config.get('client-url'));
    } catch (e) {
      console.log(e);
    }
  }
  async activateTest(req, res, next) {
    try {
      return res.redirect(config.get('client-url'));
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {}
  }

  async getUsers(req, res, next) {
    try {
      res.json(['123']);
    } catch (e) {}
  }

  async sendMail(req, res, next) {
    try {
      const { email } = req.body;
      console.log(email);
      await userService.sendMail(email);
      res.json('ok');
    } catch (e) {
      console.log(e);
      res.json('error');
    }
  }
}

module.exports = new UserController();
