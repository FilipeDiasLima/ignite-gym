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
      series: series === '--' ? 'até falhar' : series,
      repetitions: repetitions === '--' ? 'até falhar' : repetitions
    });

    return response.status(201).json();
  }

  async indexGroups(request, response) {
    const user_id = request.user.id;

    const sunday = await knex('sunday').select(
      `sunday.user_id`,
      `sunday.exercise_id as id`,
      `exercises.group`,
    )
      .leftJoin("exercises", "exercises.id", "=", `sunday.exercise_id`)
      .where({ user_id }).groupBy("group").orderBy("group")

    const monday = await knex('monday').select(
      `monday.user_id`,
      `monday.exercise_id as id`,
      `exercises.group`,
    )
      .leftJoin("exercises", "exercises.id", "=", `monday.exercise_id`)
      .where({ user_id }).groupBy("group").orderBy("group")

    const tuesday = await knex('tuesday').select(
      `tuesday.user_id`,
      `tuesday.exercise_id as id`,
      `exercises.group`,
    )
      .leftJoin("exercises", "exercises.id", "=", `tuesday.exercise_id`)
      .where({ user_id }).groupBy("group").orderBy("group")

    const wednesday = await knex('wednesday').select(
      `wednesday.user_id`,
      `wednesday.exercise_id as id`,
      `exercises.group`,
    )
      .leftJoin("exercises", "exercises.id", "=", `wednesday.exercise_id`)
      .where({ user_id }).groupBy("group").orderBy("group")

    const thursday = await knex('thursday').select(
      `thursday.user_id`,
      `thursday.exercise_id as id`,
      `exercises.group`,
    )
      .leftJoin("exercises", "exercises.id", "=", `thursday.exercise_id`)
      .where({ user_id }).groupBy("group").orderBy("group")

    const friday = await knex('friday').select(
      `friday.user_id`,
      `friday.exercise_id as id`,
      `exercises.group`,
    )
      .leftJoin("exercises", "exercises.id", "=", `friday.exercise_id`)
      .where({ user_id }).groupBy("group").orderBy("group")

    const saturday = await knex('saturday').select(
      `saturday.user_id`,
      `saturday.exercise_id as id`,
      `exercises.group`,
    )
      .leftJoin("exercises", "exercises.id", "=", `saturday.exercise_id`)
      .where({ user_id }).groupBy("group").orderBy("group")

    return response.json([
      sunday.map(item => item.group),
      monday.map(item => item.group),
      tuesday.map(item => item.group),
      wednesday.map(item => item.group),
      thursday.map(item => item.group),
      friday.map(item => item.group),
      saturday.map(item => item.group)
    ]);
  }

  async indexGroupsByDay(request, response) {
    const { day } = request.params;
    const user_id = request.user.id;

    const groups = await knex(day).select(
      `${day}.user_id`,
      `${day}.exercise_id as id`,
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
      `${day}.exercise_id as id`,
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

  async showExerciseDay(request, response) {
    const { day, exerciseId } = request.params
    const user_id = request.user.id;

    const exercise = await knex(day).select(
      `${day}.user_id`,
      `${day}.exercise_id as id`,
      `${day}.series`,
      `${day}.repetitions`,
      `exercises.name`,
      `exercises.group`,
      `exercises.demo`,
      `exercises.thumb`,
    )
      .leftJoin("exercises", "exercises.id", "=", `${day}.exercise_id`)
      .where({ user_id, exercise_id: exerciseId })

    return response.status(201).json(exercise[0]);
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