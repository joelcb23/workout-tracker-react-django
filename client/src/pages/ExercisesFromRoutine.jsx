import React, { useEffect } from "react";
import { useRoutine } from "../context/RoutineContext";
import Exercise from "../components/Exercise";
import { useParams } from "react-router-dom";

const ExercisesFromRoutine = () => {
  const { exercises, getExercises } = useRoutine();
  const params = useParams();
  const fromSlug = (slug) => {
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };
  useEffect(() => {
    const loadExercises = async () => {
      getExercises(params.id);
    };
    loadExercises();
  }, [params.id]);
  return (
    <>
      <div className=" flex justify-center items-center border-b p-10">
        <h2 className="text-3xl font-semibold">{fromSlug(params.name)}</h2>
      </div>
      <div className={"flex flex-col gap-5 p-5 my-5"}>
        {!exercises ? (
          <p className="text-center text-2xl font-semibold">
            No exercises in this routine. Add some!
          </p>
        ) : (
          exercises.map(({ id, name, sets, reps, day }) => (
            <Exercise
              key={id}
              exerciseId={id}
              routineId={params.id}
              name={name}
              sets={sets}
              reps={reps}
              day={day}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ExercisesFromRoutine;
