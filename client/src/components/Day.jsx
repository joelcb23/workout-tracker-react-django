import React, { useEffect, useState } from "react";
import ItemContainer from "./ItemContainer";

const Day = ({ day, exercise, dayCompleted }) => {
  const [activated, setActivated] = useState(false);
  const status = exercise == 0 ? "Rest" : dayCompleted ? "Done" : "Not done";
  useEffect(() => {
    setActivated(true);
  }, []);
  return (
    <ItemContainer
      className={`overflow-hidden transition-all duration-1000 ease-in-out ${
        !activated && "h-4"
      }`}
    >
      <div className="text-lg">
        <h1 className="font-semibold text-2xl mb-3 capitalize">{day}</h1>
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
    </ItemContainer>
  );
};

export default Day;
