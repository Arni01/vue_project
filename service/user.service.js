const UserModel = require('../modules/user.model');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const config = require('config');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    const activationLink = nanoid();

    const user = await UserModel.create({
      email,
      password: hashedPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${config.get('api-url')}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw new Error('Неккоректная ссылка активации');
    }

    (user.isActivated = true), await user.save();
  }

  async sendMail(email) {
    const activationLink = nanoid();
    await mailService.sendActivationMail(
      email,
      `${config.get('api-url')}/api/activate-test/${activationLink}`
    );
  }
}

module.exports = new UserService();
