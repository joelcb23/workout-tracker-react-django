import React, { useEffect, useState } from "react";

const ExerciseBar = ({ sets_Done, markSet }) => {
  const [activated, setActivated] = useState(false);
  useEffect(() => {
    setActivated(true);
  }, [markSet]);
  return (
    <div
      className={`bg-neutral-200 rounded-full w-full md:w-[480px] h-4 px-1.5 flex justify-center items-center gap-x-1.5`}
    >
      {sets_Done.map(({ id, done }) => (
        <span
          key={id}
          className="relative w-full h-2 rounded-full overflow-hidden inline-block"
        >
          <span
            className={`w-full h-2 absolute inset-0 transform transition-transform duration-1000 ${
              done ? "bg-purple-500" : "bg-neutral-400"
            } ${activated ? "translate-x-0" : "-translate-x-full"}`}
          ></span>
        </span>
      ))}
    </div>
  );
};

export default ExerciseBar;
