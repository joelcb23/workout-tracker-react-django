import { useForm } from "react-hook-form";
import { useRoutine } from "../context/RoutineContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ExercisesFromRoutine from "./ExercisesFromRoutine";

const ExerciseForm = () => {
  const { getExercise, addExercise, updateExercise } = useRoutine();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const onSubmit = handleSubmit((data) => {
    const newData = {
      name: data.name,
      description: data.description,
      sets: Number(data.sets),
      reps: Number(data.reps),
      day: data.day,
    };
    if (params.exerciseId) {
      updateExercise(params.routineId, params.exerciseId, newData);
      navigate("/workout-routine/routines");
    } else {
      addExercise(newData);
      navigate("/today");
    }
  });
  useEffect(() => {
    console.log(params);
    const loadExercise = async () => {
      if (params.exerciseId) {
        const exerciseData = await getExercise(
          params.routineId,
          params.exerciseId
        );
        setValue("name", exerciseData.name);
        setValue("description", exerciseData.description);
        setValue("sets", exerciseData.sets);
        setValue("reps", exerciseData.reps);
        setValue("day", exerciseData.day.toLowerCase());
      }
    };
    loadExercise();
  }, [params.exerciseId]);
  return (
    <>
      <div className={`flex flex-col gap-5 my-10`}>
        <h2 className={`text-3xl font-semibold text-center`}>
          {params.exerciseId ? "Update this exercise" : "Add a new exercise"}
        </h2>
        {!params.exerciseId ? (
          <p className={`text-neutral-600 text-center`}>
            Greate! Lets create a new exercise and add it to your routine.{" "}
            <br />
            Remember that this exercise is added to the active routine.
          </p>
        ) : (
          <p className={`text-neutral-600 text-center`}>
            Add the new values you want to update.
          </p>
        )}
      </div>
      <form
        action=""
        onSubmit={onSubmit}
        className={`form-exercise md:w-2/3 md:mx-auto`}
      >
        <p>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Example: Bench Press"
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
        </p>
        <p>
          <label htmlFor="description">Description:</label>
          <textarea
            rows="3"
            id="description"
            type="text"
            placeholder="Give a short description"
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
            })}
          />
        </p>
        <p>
          <label htmlFor="day">Day:</label>
          <select id="day" {...register("day")}>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </p>
        <div className="w-full flex items-center gap-x-3">
          <p>
            <label htmlFor="sets">Sets:</label>
            <input
              id="sets"
              type="number"
              placeholder="0"
              {...register("sets", {
                required: {
                  value: true,
                  message: "Sets is required",
                },
              })}
            />
          </p>
          <p>
            <label htmlFor="reps">Reps:</label>
            <input
              id="reps"
              type="number"
              placeholder="0"
              {...register("reps", {
                required: {
                  value: true,
                  message: "Reps is required",
                },
              })}
            />
          </p>
        </div>
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-semibold p-3 rounded-lg mt-3">
          {params.exerciseId ? "Update" : "Add"} exercise
        </button>
      </form>
    </>
  );
};

export default ExerciseForm;
