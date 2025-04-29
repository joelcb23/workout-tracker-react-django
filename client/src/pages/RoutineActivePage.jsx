import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Day from "../components/Day";
import { useRoutine } from "../context/RoutineContext";
import { unmarkSetRequest } from "../api/routine.api";

const RoutineActivePage = () => {
  const { routine, exercises, getExercises } = useRoutine();
  const days = [
    {
      id: 1,
      day: "Monday",
    },
    {
      id: 2,
      day: "Tuesday",
    },
    {
      id: 3,
      day: "Wednesday",
    },
    {
      id: 4,
      day: "Thursday",
    },
    {
      id: 5,
      day: "Friday",
    },
    {
      id: 6,
      day: "Saturday",
    },
    {
      id: 7,
      day: "Sunday",
    },
  ];
  const filterDay = (day) => {
    return exercises.filter((e) => e.day === day.toUpperCase()).length;
  };
  const dayCompleted = (day) => {
    const exer = exercises.filter((e) => e.day === day.toUpperCase());
    const totalSeries = exer.reduce((acc, curr) => acc + curr.sets, 0);
    const seriesCompleted = exer.reduce(
      (acc, curr) => acc + curr.sets_Done.filter((s) => s.done).length,
      0
    );
    return seriesCompleted === totalSeries;
  };

  const unmarkSets = async () => {
    await unmarkSetRequest(routine.id);
  };
  useEffect(() => {
    const loadRoutine = async () => {
      routine?.id && getExercises(routine.id);
    };
    loadRoutine();
  }, [routine]);
  return (
    <>
      {routine ? (
        <>
          <h1 className="text-3xl text-center font-semibold uppercase p-10 border-b">
            {routine.name}
          </h1>
          <div className={`flex flex-col gap-4 my-5 p-5`}>
            {!exercises ? (
              <h1 className="text-2xl text-center font-semibold uppercase pb-4">
                No exercises in this routine
              </h1>
            ) : (
              days.map((day) => (
                <Day
                  key={day.id}
                  day={day.day}
                  exercise={filterDay(day.day)}
                  dayCompleted={dayCompleted(day.day)}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <h1 className="text-2xl text-center font-semibold uppercase pb-4">
          There's not an active routine, create one or active one.
        </h1>
      )}
      <div className="flex justify-end items-center gap-5 my-5 md:my-10 md:w-2/3 mx-auto">
        <button
          onClick={unmarkSets}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full cursor-pointer text-center p-3 px-5"
        >
          Unmark Sets
        </button>

        <Link
          to={"/workout-routine/active/add-exercise"}
          className="bg-sky-400 hover:bg-sky-600 text-white font-semibold rounded-full cursor-pointer text-center p-3 px-5"
        >
          Add Exercise
        </Link>
      </div>
    </>
  );
};

export default RoutineActivePage;
