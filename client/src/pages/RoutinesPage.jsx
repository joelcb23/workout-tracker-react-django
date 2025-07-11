import PopUp from "../components/PopUp";
import Routine from "../components/Routine";
import { useRoutine } from "../context/RoutineContext";
import { useEffect, useState } from "react";
import workoutImg from "../assets/workout.jpg";

const RoutinesPage = () => {
  const { routine, routines, getRoutines, createRoutine } = useRoutine();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
    };
    createRoutine(data);
    setShowModal(false);
  };
  const renderRoutinesList = () => {
    if (!routines || routines.length === 0)
      return (
        <>
          <p className="text-center text-3xl font-semibold mb-10">
            No routines yet. Create a new one!
          </p>
          <img
            src={workoutImg}
            alt="workout"
            className="w-1/2 mx-auto lg:w-1/4"
          />
        </>
      );
    return routines.map(({ id, name, is_active }) => (
      <Routine key={id} id={id} name={name} isActive={is_active} />
    ));
  };
  useEffect(() => {
    const loadRoutines = async () => {
      routine && getRoutines();
    };
    loadRoutines();
  }, [routine?.id, routine?.is_active]);
  return (
    <>
      <h1
        className={`text-3xl text-center font-semibold uppercase p-10 border-b`}
      >
        Your Routines
      </h1>
      <div className="min-h-[850px] flex flex-col gap-5 p-5 my-5">
        {renderRoutinesList()}
      </div>
      <p
        className="bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded cursor-pointer text-center p-3 px-5 mx-5 md:w-2/3 md:mx-auto"
        onClick={() => setShowModal(true)}
      >
        Add a new routine
      </p>
      <PopUp show={showModal} close={closeModal}>
        <h2 className="text-2xl font-semibold text-center my-3">
          Create a new routine
        </h2>
        <p className="text-neutral-600 text-base text-center">
          Cool, lets create a new routine. You can add exercises later, for that
          you must active the routine.
        </p>
        <form onSubmit={onSubmit} className="form-exercise my-3">
          <p>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Volume routine"
            />
          </p>
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded cursor-pointer text-center p-3 px-5">
            Create
          </button>
        </form>
      </PopUp>
    </>
  );
};

export default RoutinesPage;
