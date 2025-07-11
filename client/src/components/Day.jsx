import React, { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";

const Day = ({ day, exercise, dayCompleted }) => {
  const [activated, setActivated] = useState(false);
  const status = exercise == 0 ? "Rest" : dayCompleted ? "Done" : "Not done";
  const exerciseLabel = useEffect(() => {
    setActivated(true);
  }, []);
  return (
    <ItemContainer
      className={`text-white overflow-hidden transition-all duration-1000 ease-in-out ${
        status === "Rest"
          ? "bg-sky-400"
          : dayCompleted
          ? "bg-green-400"
          : "bg-red-400"
      }`}
    >
      <div className="text-lg">
        <h1 className="font-semibold text-2xl mb-3 capitalize">{day}</h1>
        <p className="capitalize">
          {exercise === 0 ? "No sets. Rest day" : `Exercises: ${exercise}`}
        </p>
      </div>
      <h2 className={`text-lg font-semibold`}>{status}</h2>
    </ItemContainer>
  );
};

export default Day;
