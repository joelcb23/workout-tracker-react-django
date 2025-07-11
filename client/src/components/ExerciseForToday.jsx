import { useEffect, useMemo, useState } from "react";
import ExerciseBar from "./ExerciseBar";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import { useRoutine } from "../context/RoutineContext";
import { markSetRequest } from "../api/routine.api";
import ItemContainer from "./ItemContainer";

const ExerciseForToday = ({ exerciseId, name, sets, reps, sets_Done }) => {
  const { today, routine, getExercisesForToday } = useRoutine();
  const markSet = useMemo(
    () => sets_Done.filter(({ done }) => !done),
    [sets_Done]
  );
  const completedExercise = sets_Done.filter(({ done }) => done).length;

  const markCompleted = async (id) => {
    try {
      await markSetRequest(routine.id, exerciseId, id);
      await getExercisesForToday(routine.id, today);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ItemContainer className={`bg-white lg:w-2/3`}>
      <div className={`  w-[90%] flex flex-col justify-center gap-2`}>
        <div className="flex justify-between items-center text-lg gap-4">
          <h1 className="font-semibold capitalize">{name}</h1>
          <p>
            Series/Reps: {sets}/{reps}
          </p>
        </div>
        <ExerciseBar sets_Done={sets_Done} markSet={markSet} />
      </div>
      {completedExercise < sets ? (
        <IoCheckmarkCircleOutline
          className="text-2xl text-neutral-400 w-6"
          onClick={() => markCompleted(markSet[0].id)}
        />
      ) : (
        <IoCheckmarkCircleSharp className="text-2xl text-purple-500" />
      )}
    </ItemContainer>
  );
};

export default ExerciseForToday;
