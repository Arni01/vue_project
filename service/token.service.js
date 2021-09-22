const jwt = require('jsonwebtoken');
const config = require('config');
const tokenModel = require('../modules/token.model');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, config.get('jstSecretAccess'), {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, config.get('jstSecretRefresh'), {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({
      user: userId,
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService();
