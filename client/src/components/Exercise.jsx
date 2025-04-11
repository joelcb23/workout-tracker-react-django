import React from "react";
import { Link } from "react-router-dom";
import { useRoutine } from "../context/RoutineContext";

const Exercise = ({ routineId, exerciseId, name, sets, reps, day }) => {
  const { deleteExercise } = useRoutine();
  return (
    <div className="w-full h-20 bg-white px-12 flex justify-between items-center shadow-lg rounded relative">
      <div className="flex items-center w-full text-lg gap-x-4">
        <h1 className="font-semibold capitalize">
          {name}/{day}
        </h1>
        <p>
          Series/Reps: {sets}/{reps}
        </p>
      </div>

      <Link
        to={`/workout-routine/edit-exercise/${routineId}/${exerciseId}`}
        className={` text-green-600 underline hover:no-underline text-base rounded-lg px-3 py-2`}
      >
        Edit...
      </Link>
      <button
        title="Delete element"
        onClick={() => {
          console.log(routineId, exerciseId);
          deleteExercise(routineId, exerciseId);
        }}
        className={`absolute right-[-15px] top-[-5px] p-1 text-center rounded-full bg-neutral-100   hover:bg-neutral-300`}
      >
        ❌
      </button>
    </div>
  );
};

export default Exercise;
