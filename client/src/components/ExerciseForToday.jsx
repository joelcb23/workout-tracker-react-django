import React, { use, useEffect } from "react";
import ExerciseBar from "./ExerciseBar";
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkCircleSharp,
  IoCloudyNight,
} from "react-icons/io5";
import { useRoutine } from "../context/RoutineContext";
import { markSetRequest } from "../api/routine.api";
import ItemContainer from "./ItemContainer";

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
    <ItemContainer>
      <div className={`  w-[90%] flex flex-col justify-center gap-2`}>
        <div className="flex justify-between items-center text-lg gap-4">
          <h1 className="font-semibold capitalize">{name}</h1>
          <p>
            Series/Reps: {sets}/{reps}
          </p>
        </div>
        <ExerciseBar sets_Done={sets_Done} />
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
