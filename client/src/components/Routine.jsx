import { Link } from "react-router-dom";
import { useRoutine } from "../context/RoutineContext";

const Routine = ({ id, name, isActive }) => {
  const { activateRoutine, deleteRoutine } = useRoutine();
  const toSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Reemplaza espacios por guiones
      .replace(/[^\w-]+/g, ""); // Elimina caracteres especiales
  };

  const handleMarkActive = (id) => {
    activateRoutine(id);
  };
  return (
    <div className="w-full h-20 bg-white px-12 flex justify-between items-center shadow-lg rounded relative">
      <div className={`min-w-60 flex justify-between items-center gap-x-5`}>
        <h2 className="font-semibold text-2xl capitalize">{name}</h2>
        <p className={`text-base text-blue-400 underline hover:no-underline`}>
          <Link to={`/workout-routine/routine/${id}/${toSlug(name)}`}>
            See Exercises ...
          </Link>
        </p>
      </div>
      <p
        title="Click to change status"
        className={`text-xl cursor-pointer ${
          isActive ? "text-sky-500" : "text-neutral-400"
        }`}
        onClick={() => handleMarkActive(id)}
      >
        {isActive ? "Active" : "Inactive"}
      </p>
      <button
        title="Delete element"
        onClick={() => {
          console.log(id);
          deleteRoutine(id);
        }}
        className={`absolute right-[-15px] top-[-5px] p-1 text-center rounded-full bg-neutral-100   hover:bg-neutral-300`}
      >
        ❌
      </button>
    </div>
  );
};

export default Routine;
