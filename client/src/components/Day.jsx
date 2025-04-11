import React, { useEffect, useState } from "react";

const Day = ({ day, exercise, dayCompleted }) => {
  const [activated, setActivated] = useState(false);
  const status = exercise == 0 ? "Rest" : dayCompleted ? "Done" : "Not done";
  useEffect(() => {
    setActivated(true);
  }, []);
  return (
    <div
      className={`w-full bg-white px-12 flex justify-between items-center shadow-lg rounded overflow-hidden transition-all duration-1000 ease-in-out ${
        activated ? "h-20" : "h-4"
      }`}
    >
      <div className="text-lg">
        <h1 className="font-semibold mb-3 capitalize">{day}</h1>
        <p className="capitalize">
          {exercise === 0 ? "Rest day" : `Exercises: ${exercise}`}
        </p>
      </div>
      <h2
        className={`text-lg  ${
          status === "Rest"
            ? "text-sky-500"
            : dayCompleted
            ? "text-green-500"
            : "text-red-400"
        }`}
      >
        {status}
      </h2>
    </div>
  );
};

export default Day;
