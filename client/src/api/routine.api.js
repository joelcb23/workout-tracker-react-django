import api from "./api";

// Routine request
export const getRoutineActiveRequest = async () =>
  await api.get(`/routines/get-routine-active`);

export const getRoutinesRequest = async () =>
  await api.get(`/routines/get-routines`);

export const createRoutineRequest = async (data) =>
  await api.post(`/routines/create-routine`, data);

export const activateRoutineRequest = async (routine_id) =>
  await api.put(`/routines/activate-routine/${routine_id}`);

export const deleteRoutineRequest = async (routineId) =>
  await api.delete(`/routines/delete-routine/${routineId}`);

// Exercise request
export const getExercisesRequest = async (routine_id) =>
  await api.get(`/routines/routine/${routine_id}/get-exercises`);

export const getExercisesFromDayRequest = async (routine_id, day) =>
  await api.get(
    `/routines/routine/${routine_id}/get-exercises-from-day/${day}`
  );

export const getExerciseRequest = async (routine_id, exercise_id) =>
  await api.get(`/routines/routine/${routine_id}/get-exercise/${exercise_id}`);

export const addExerciseRequest = async (routineId, data) =>
  await api.post(`/routines/routine/${routineId}/add-exercise`, data);

export const updateExerciseRequest = async (routineId, exerciseId, data) =>
  await api.put(
    `/routines/routine/${routineId}/update-exercise/${exerciseId}`,
    data
  );

export const deleteExerciseRequest = async (routineId, exerciseId) =>
  await api.delete(
    `/routines/routine/${routineId}/delete-exercise/${exerciseId}`
  );

// Sets Request
export const getSetsRequest = async (routine_id, exercise_id) =>
  await api.get(
    `/routines/routine/${routine_id}/exercise/${exercise_id}/get-sets`
  );

export const markSetRequest = async (routine_id, exercise_id, set_id) =>
  await api.put(
    `/routines/routine/${routine_id}/exercise/${exercise_id}/set/${set_id}/mark-set-done`
  );

export const unmarkSetRequest = async (routine_id) =>
  await api.put(`/routines/routine/${routine_id}/unmark-set-done`);
