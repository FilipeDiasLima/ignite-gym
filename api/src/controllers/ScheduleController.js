const knex = require("../database");
const AppError = require("../utils/AppError");

class ScheduleController {
  async create(request, response) {
    const { day, repetitions, series, exercise_id } = request.body
    const user_id = request.user.id;

    if (!day || !repetitions || !series) {
      throw new AppError("Informe todos os campos (dia, repetições e séries).");
    }

    const checkExerciseExists = await knex(day).where({ user_id, exercise_id }).first()

    if (checkExerciseExists) {
      throw new AppError("Este exercício já está cadastrado.");
    }

    await knex(day).insert({
      user_id,
      exercise_id,
      series,
      repetitions
    });

    return response.status(201).json();
  }

  async indexGroupsByDay(request, response) {
    const { day } = request.params;
    const user_id = request.user.id;

    const groups = await knex(day).select(
      `${day}.user_id`,
      `${day}.exercise_id`,
      `exercises.group`,
    )
      .leftJoin("exercises", "exercises.id", "=", `${day}.exercise_id`)
      .where({ user_id }).groupBy("group").orderBy("group")

    const formattedGroups = groups.map(item => item.group)

    return response.json(formattedGroups);
  }

  async indexExerciseByGroup(request, response) {
    const { day, group } = request.params;
    const user_id = request.user.id;

    const exercises = await knex(day).select(
      `${day}.user_id`,
      `${day}.exercise_id`,
      `${day}.series`,
      `${day}.repetitions`,
      `exercises.name`,
      `exercises.group`,
      `exercises.demo`,
      `exercises.thumb`,
    )
      .leftJoin("exercises", "exercises.id", "=", `${day}.exercise_id`)
      .where({ user_id, group }).orderBy("name")

    return response.json(exercises);
  }

  async update(request, response) {
    const { day, repetitions, series, exercise_id } = request.body
    const user_id = request.user.id;

    const checkExerciseExists = await knex(day).where({ user_id, exercise_id }).first()

    if (!checkExerciseExists) {
      throw new AppError("Exercício ainda não está cadastrado.");
    }

    await knex(day).where({ exercise_id }).update({
      series,
      repetitions
    });

    return response.status(201).json();
  }

  async delete(request, response) {
    const { day, exerciseId } = request.params
    const user_id = request.user.id;

    await knex(day).where({ user_id, exercise_id: exerciseId }).del()

    return response.status(201).json();
  }
}

module.exports = ScheduleController;