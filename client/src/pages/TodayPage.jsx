import React, { useEffect } from "react";
import ExerciseForToday from "../components/ExerciseForToday";
import { PieChart, Pie, Cell } from "recharts";
import { useRoutine } from "../context/RoutineContext";
// import { useAuth } from "../context/AuthContext";

const TodayPage = () => {
  const { routine, exerForToday, today, getExercisesForToday } = useRoutine();

  const totalSeries = exerForToday.reduce((acc, curr) => acc + curr.sets, 0);
  const seriesCompleted = exerForToday.reduce(
    (acc, curr) => acc + curr.sets_Done.filter((s) => s.done).length,
    0
  );

  const COLORS = ["#8B5FC6", "#D9D9D9"];
  const data = [
    { name: "done", value: seriesCompleted },
    { name: "pending", value: totalSeries - seriesCompleted },
  ];
  useEffect(() => {
    const loadExercises = async () => {
      routine?.id && (await getExercisesForToday(routine.id));
    };
    loadExercises();
  }, [routine?.id]);
  return (
    // <div className="bg-white max-w-[1080px] min-h-[800px] mx-auto flex flex-col gap-y-4 my-14 px-10 py-7 rounded-xl">
    <>
      <div className="flex justify-between items-center border-b my-10 px-5 md:px-20">
        <h2 className="text-3xl font-semibold py-5">{today}</h2>
        <span
          className={`w-20 h-20 relative flex justify-center items-center ${
            totalSeries === 0 ? "hidden" : ""
          }`}
        >
          <PieChart width={70} height={70}>
            <Pie
              data={data}
              cx={29}
              cy={31}
              innerRadius={20}
              outerRadius={30}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">{`${(
            (seriesCompleted / totalSeries) *
            100
          ).toFixed(0)}%`}</span>
        </span>
      </div>
      <div className={"flex flex-col gap-y-4 p-5"}>
        {exerForToday.length === 0 ? (
          <p className="text-center text-2xl font-semibold">
            No exercises for today. Take a rest.
          </p>
        ) : (
          exerForToday.map(({ id, name, sets, reps, sets_Done }) => (
            <ExerciseForToday
              key={id}
              exerciseId={id}
              name={name}
              sets={sets}
              reps={reps}
              sets_Done={sets_Done}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TodayPage;
