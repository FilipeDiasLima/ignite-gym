const AppError = require("../utils/AppError");
const knex = require("../database");
const dayjs = require("dayjs");

class HistoryController {
  async index(request, response) {
    const user_id = request.user.id;
    const daysFixed = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const history = await knex("history")
      .select(
        "history.id",
        "history.user_id",
        "history.exercise_id",
        "history.date",
        "exercises.name",
        "exercises.group",
        "history.created_at"
      )
      .leftJoin("exercises", "exercises.id", "=", "history.exercise_id")
      .where({ user_id }).orderBy("history.created_at", "desc");

    const groups = await knex("exercises").select("group").groupBy("group").orderBy("group");
    const formattedGroups = groups.map(item => item.group);

    const days = [];

    for (let exercise of history) {
      if (!days.includes(exercise.date)) {
        days.push(exercise.date);
      }
    }

    const exercisesByDay = days.map(day => {
      const exercises = history
        .filter((exercise) => exercise.date === day)
        .map((exercise) => {
          return {
            ...exercise,
            hour: dayjs(new Date(exercise.created_at)).format('HH:mm')
          }
        });

      const exercisesByGroup =
        formattedGroups.map(group => {
          const ex = exercises.filter(exercise => {
            return exercise.group === group
          })
          return ex.length > 0 && { [group]: ex }
        })

      const formattedExercisesByGroup = exercisesByGroup.filter(item => item !== false)
      return ({ title: dayjs(new Date(day)).format('DD.MM.YYYY'), dayName: daysFixed[new Date(day).getDay()], data: formattedExercisesByGroup });
    });

    return response.json(exercisesByDay);
  }

  async create(request, response) {
    const { exercise_id } = request.body;
    const user_id = request.user.id;
    const date = dayjs(new Date()).format('YYYY-MM-DD')

    if (!exercise_id) {
      throw new AppError("Informe o id do exercício.");
    }

    await knex("history").insert({ user_id, exercise_id, date });

    return response.status(201).json();
  }

  async indexToday(request, response) {
    const user_id = request.user.id;
    const today = dayjs(new Date()).format('YYYY-MM-DD')

    const history = await knex("history")
      .select(
        "history.id",
        "history.user_id",
        "history.exercise_id",
        "exercises.name",
        "exercises.group",
        "history.date",
        "history.created_at"
      )
      .leftJoin("exercises", "exercises.id", "=", "history.exercise_id")
      .where({ user_id, "history.date": today }).orderBy("history.created_at", "desc");

    return response.json(history);
  }
}

module.exports = HistoryController;