export type ExerciseDTO = {
  id: string;
  demo: string;
  group: string;
  name: string;
  repetitions: string;
  series: string;
  thumb: string;
  updated_at: string;
};

export type ScheduleExerciseDTO = {
  user_id: string;
  exercise_id: string;
  demo: string;
  group: string;
  name: string;
  repetitions: string;
  series: string;
  thumb: string;
};
