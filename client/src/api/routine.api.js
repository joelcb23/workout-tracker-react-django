import api from "./api";

// Routine request
export const getRoutineActiveRequest = async () =>
  await api.get(`/routines/active`);

export const getRoutinesRequest = async () => await api.get(`/routines`);

export const createRoutineRequest = async (data) =>
  await api.post(`/routines/create`, data);

export const activateRoutineRequest = async (routine_id) =>
  await api.put(`/routines/activate/${routine_id}`);

export const deleteRoutineRequest = async (routineId) =>
  await api.delete(`/routines/delete/${routineId}`);

// Exercise request
export const getExercisesRequest = async (routine_id) =>
  await api.get(`/routines/${routine_id}/exercises`);

export const getExercisesFromDayRequest = async (routine_id, day) =>
  await api.get(`/routines/${routine_id}/exercises/${day}`);

export const getExerciseRequest = async (routine_id, exercise_id) =>
  await api.get(`/routines/${routine_id}/exercises/${exercise_id}/detail`);

export const addExerciseRequest = async (routineId, data) =>
  await api.post(`/routines/${routineId}/exercises/add`, data);

export const updateExerciseRequest = async (routineId, exerciseId, data) =>
  await api.put(`/routines/${routineId}/exercises/${exerciseId}/update`, data);

export const deleteExerciseRequest = async (routineId, exerciseId) =>
  await api.delete(`/routines/${routineId}/exercises/${exerciseId}/delete`);

// Sets Request
export const getSetsRequest = async (routine_id, exercise_id) =>
  await api.get(`/routines/${routine_id}/exercises/${exercise_id}/sets`);

export const markSetRequest = async (routine_id, exercise_id, set_id) =>
  await api.put(
    `/routines/${routine_id}/exercises/${exercise_id}/sets/${set_id}/mark-done`
  );

export const unmarkSetRequest = async (routine_id) =>
  await api.put(`/routines/${routine_id}/sets/unmark-all`);
