import { Link } from "react-router-dom";
import { useRoutine } from "../context/RoutineContext";
import ItemContainer from "./ItemContainer";

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
    <ItemContainer className=" relative">
      <div
        className={`min-w-60 flex flex-col md:justify-between md:gap-5
          md:flex-row md:items-center`}
      >
        <h2 className="font-semibold text-2xl capitalize">{name}</h2>
        <p className={`text-base text-blue-400 underline hover:no-underline`}>
          <Link to={`/workout-routine/routine/${id}/${toSlug(name)}`}>
            See Exercises ...
          </Link>
        </p>
      </div>
      <p
        title="Click to change status"
        className={`text-lg cursor-pointer ${
          isActive ? "text-purple-500" : "text-neutral-400"
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
        className={`absolute right-[-15px] top-[-5px] p-1 text-sm text-center rounded-full bg-neutral-100   hover:bg-neutral-300`}
      >
        ❌
      </button>
    </ItemContainer>
  );
};

export default Routine;
