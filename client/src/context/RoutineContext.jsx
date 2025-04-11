import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  activateRoutineRequest,
  addExerciseRequest,
  createRoutineRequest,
  deleteExerciseRequest,
  deleteRoutineRequest,
  getExerciseRequest,
  getExercisesRequest,
  getRoutineActiveRequest,
  getRoutinesRequest,
  updateExerciseRequest,
} from "../api/routine.api";

export const RoutineContext = createContext();

export const useRoutine = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error("useRoutine must be used within a RoutineProvider");
  }
  return context;
};

export const RoutineProvider = ({ children }) => {
  const { user } = useAuth();
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const today = days[new Date().getDay()];
  const [nameRoutine, setNameRoutine] = useState("");
  const [routine, setRoutine] = useState({});
  const [routines, setRoutines] = useState([]);
  const [exerForToday, setExerForToday] = useState([]);
  const [exercises, setExercises] = useState([]);

  const getRoutines = async () => {
    try {
      const res = await getRoutinesRequest();
      setRoutines(res.data.routines);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const routineActive = async () => {
    try {
      const res = await getRoutineActiveRequest();
      setRoutine(res.data.routine_active);
    } catch (error) {
      console.log(error);
    }
  };

  const createRoutine = async (routine) => {
    try {
      const res = await createRoutineRequest(routine);
      console.log(res);
      setRoutines([...routines, res.data.routine]);
    } catch (error) {
      console.error(error);
    }
  };

  const activateRoutine = async (routine_id) => {
    try {
      const res = await activateRoutineRequest(routine_id);
      // console.log(res.data);
      setRoutine(res.data.routine);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRoutine = async (routine_id) => {
    try {
      const res = await deleteRoutineRequest(routine_id);
      // console.log(res.data);
      setRoutines(routines.filter((r) => r.id !== routine_id));
    } catch (error) {
      console.error(error);
    }
  };

  const getExercisesForToday = async (id) => {
    try {
      const res = await getExercisesRequest(id);
      res.data.exercises &&
        setExerForToday(res.data.exercises.filter((e) => e.day === today));
    } catch (error) {
      console.error(error);
    }
  };
  const getExercises = async (routineId) => {
    try {
      const res = await getExercisesRequest(routineId);
      // console.log(res);
      setExercises(res.data.exercises);
    } catch (error) {
      console.log(error);
    }
  };

  const getExercise = async (routineId, exerciseId) => {
    try {
      const res = await getExerciseRequest(routineId, exerciseId);
      console.log(res);
      return res.data.exercise;
      // setExercises(res.data.exercises);
    } catch (error) {
      console.log(error);
    }
  };

  const addExercise = async (data) => {
    try {
      const res = await addExerciseRequest(routine.id, data);
      setExercises([...exercises, res.data.exercise]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateExercise = async (routineId, exerciseId, data) => {
    try {
      const res = await updateExerciseRequest(routineId, exerciseId, data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExercise = async (routineId, exerciseId) => {
    try {
      const res = await deleteExerciseRequest(routineId, exerciseId);
      console.log(res.data);
      setExercises(exercises.filter((e) => e.id !== exerciseId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    routineActive();
    console.log("holaa, desde el routine provider");
  }, [user]);
  return (
    <RoutineContext.Provider
      value={{
        nameRoutine,
        setNameRoutine,
        routine,
        routines,
        getRoutines,
        createRoutine,
        activateRoutine,
        deleteRoutine,
        exercises,
        getExercises,
        getExercise,
        addExercise,
        updateExercise,
        deleteExercise,
        exerForToday,
        getExercisesForToday,
        today,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};
