const knex = require("../database");
const AppError = require("../utils/AppError");
const GenerateRefreshToken = require("../providers/GenerateRefreshToken");
const GenerateToken = require("../providers/GenerateToken");
const dayjs = require("dayjs");

class UserRefreshToken {
  async create(request, response) {
    const { token } = request.body;
    console.log("🚀 ~ file: UserRefreshToken.js:10 ~ UserRefreshToken ~ create ~ token", token)

    if (!token) {
      throw new AppError("Informe o token de autenticação.", 401);
    }

    const userToken = await knex("users_tokens").where({ token }).first();
    console.log(userToken)

    if (!userToken) {
      throw new AppError("Refresh token não encontrado para este usuário.", 404);
    }

    const generateTokenProvider = new GenerateToken();
    const refreshToken = await generateTokenProvider.execute(userToken.user_id);

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(userToken.expires_in));

    if (refreshTokenExpired) {
      await knex("users_tokens").where({ user_id: userToken.user_id }).delete();

      const generateRefreshToken = new GenerateRefreshToken();
      await generateRefreshToken.execute(userToken.user_id, refreshToken);

      return response.json({ token: refreshToken });
    }

    return response.json({ token });
  }
}

module.exports = UserRefreshToken;