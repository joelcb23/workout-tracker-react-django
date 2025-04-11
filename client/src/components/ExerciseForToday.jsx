import React, { use, useEffect } from "react";
import ExerciseBar from "./ExerciseBar";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
  IoCloudyNight,
} from "react-icons/io5";
import { useRoutine } from "../context/RoutineContext";
import { markSetRequest } from "../api/routine.api";

const ExerciseForToday = ({ exerciseId, name, sets, reps, sets_Done }) => {
  const { routine } = useRoutine();
  const completedExercise = sets_Done.filter(({ done }) => done).length;
  const markSet = sets_Done.filter(({ done }) => !done);

  const markCompleted = async (id) => {
    try {
      await markSetRequest(routine.id, exerciseId, id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-20 bg-white px-12 flex justify-between items-center shadow-lg rounded">
      <div className={`flex  flex-col justify-center gap-y-2`}>
        <div className="flex items-center w-full text-lg gap-x-4">
          <h1 className="font-semibold">{name}</h1>
          <p>
            Series/Reps: {sets}/{reps}
          </p>
        </div>
        <ExerciseBar sets_Done={sets_Done} />
      </div>
      {completedExercise < sets ? (
        <IoCheckmarkCircleOutline
          className="text-2xl text-neutral-400 "
          onClick={() => markCompleted(markSet[0].id)}
        />
      ) : (
        <IoCheckmarkCircleSharp className="text-2xl text-sky-500" />
      )}
    </div>
  );
};

export default ExerciseForToday;
