import { Link } from "react-router-dom";
import { useRoutine } from "../context/RoutineContext";
import ItemContainer from "./ItemContainer";

const Exercise = ({ routineId, exerciseId, name, sets, reps, day }) => {
  const { deleteExercise } = useRoutine();
  return (
    <ItemContainer className="bg-white relative md:text-lg lg:w-2/3">
      <div className="flex items-center w-full gap-4">
        <h1 className="md:hidden font-semibold capitalize" title={name}>
          {name.slice(0, 10)}
          {name.length > 10 ? "..." : ""}/{day}
        </h1>
        <h1 className="hidden md:block font-semibold capitalize" title={name}>
          {name}/{day}
        </h1>
        <p>
          Sets/Reps: {sets}/{reps}
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
          deleteExercise(routineId, exerciseId);
        }}
        className={`absolute right-[-15px] top-[-5px] p-1 text-sm text-center rounded-full bg-neutral-100   hover:bg-neutral-300`}
      >
        ❌
      </button>
    </ItemContainer>
  );
};

export default Exercise;
