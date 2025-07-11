import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRoutine } from "../context/RoutineContext";
import { unmarkSetRequest } from "../api/routine.api";
import Day from "../components/Day";
import dumbbell from "../assets/dumbbell.jpg";

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
      (acc, curr) => acc + curr.sets_Done?.filter((s) => s.done).length,
      0
    );
    return seriesCompleted === totalSeries;
  };

  const unmarkSets = async () => {
    await unmarkSetRequest(routine.id);
    await getExercises(routine.id);
  };
  useEffect(() => {
    const loadRoutine = async () => {
      routine?.id && getExercises(routine.id);
    };
    loadRoutine();
  }, [routine?.id]);
  return (
    <>
      {routine ? (
        <>
          <h1 className="text-3xl text-center font-semibold uppercase p-10 border-b">
            Daily Progress{` - ${routine.name}`}
          </h1>
          <div
            className={`min-h-[850px] flex flex-col lg:w-2/3 lg:mx-auto gap-4 my-5 p-5 ${
              exercises ? "lg:grid grid-cols-2" : "lg:flex-col"
            }`}
          >
            {!exercises ? (
              <>
                <h1 className="w-full text-3xl text-center font-semibold uppercase pb-4 mb-10">
                  No exercises in this routine
                </h1>
                <img src={dumbbell} alt="dumbbell" className="w-1/2 mx-auto" />
              </>
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
          </div>{" "}
          <div className="w-full md:w-1/2 mx-auto flex justify-center items-center gap-5 my-5 md:my-10">
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
      ) : (
        <>
          <h1 className="text-2xl text-center font-semibold uppercase pb-4 my-20">
            There's not an active routine,{" "}
            <Link
              to="/workout-routine/routines"
              className="text-blue-500 underline hover:no-underline"
            >
              create one or active one.
            </Link>
          </h1>
          <img src={dumbbell} alt="dumbbell" className="w-1/2 mx-auto my-10" />
        </>
      )}
    </>
  );
};

export default RoutineActivePage;
