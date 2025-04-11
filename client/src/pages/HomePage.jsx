import { Link } from "react-router-dom";
import { MdContactSupport, MdEditDocument } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import manTraining from "../assets/man-2604149_1920.jpg";
import womanTraining from "../assets/woman-8865733_1920.jpg";
import calisthenicsPractice from "../assets/calisthenic.jpg";

const HomePage = () => {
  return (
    <main className={`bg-white w-2/3 mx-auto px-10 py-5 my-10 rounded`}>
      <header className="mx-0 py-20 px-7 p flex justify-between items-center gap-x-10">
        <div className="w-2/3 text-xl py-10 flex flex-col gap-y-10">
          <h1 className="text-4xl font-bold">
            WELCOME TO YOUR WORKOUT TRACKER
          </h1>
          <p className="text-neutral-600 ">
            Do you want to track your exercises, routines or progress of these?
            This is the perfect place for you!
          </p>
          <div className="flex gap-x-10 justify-center items-center">
            <p className="bg-sky-400 hover:bg-sky-600 text-white w-50 font-semibold rounded-full cursor-pointer text-center p-3 shadow-xl">
              <Link to={"/register"}>Register now</Link>
            </p>
            <p className="bg-white hover:bg-neutral-200 w-50 text-sky-400 border border-sky-400 font-semibold rounded-full cursor-pointer text-center p-3 shadow-xl">
              <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
        <img
          src={womanTraining}
          alt="woman training in gym"
          className={`w-1/3 rounded-lg`}
        />
      </header>
      <section className={`flex flex-col items-center text-center py-20`}>
        <h2 className={`text-3xl font-semibold mb-10`}>
          What do you can do here?
        </h2>
        <p className={`text-neutral-600 text-lg `}>
          This is a place where you can track your routines and exercises.
          Create new routines and add exercises to them. Could also be used to
          track your progress for each exercise.
        </p>
        <div className={`flex justify-center gap-x-10 mt-10 h-64`}>
          <img
            src={manTraining}
            className="mt-10 w-1/3 rounded-lg object-cover"
            alt="man training with dumbbells"
          />
          <img
            src={calisthenicsPractice}
            className="mt-10 w-1/3 rounded-lg object-cover"
            alt="man training calisthenics"
          />
        </div>
      </section>
      <section className={`my-10 px-7 py-20 bg-sky-300 rounded-lg`}>
        <h2 className={`text-3xl font-semibold text-center mb-10`}>
          Features & Benefits
        </h2>
        <div className={`flex justify-center gap-x-10`}>
          <div
            className={`w-1/3 text-center bg-white p-10 rounded-lg shadow-lg flex flex-col items-center`}
          >
            <GiProgression className={`text-6xl mb-5`} />
            <h3 className={`text-2xl font-bold`}>Track Progress</h3>
            <p className={`text-neutral-600 mt-2`}>
              Monitor your improvement over time with detailed logs of your
              workouts and progress.
            </p>
          </div>
          <div
            className={`w-1/3 text-center bg-white p-10 rounded-lg shadow-lg flex flex-col items-center`}
          >
            <MdEditDocument className={`text-6xl mb-5`} />
            <h3 className={`text-2xl font-bold`}>Custom Routines</h3>
            <p className={`text-neutral-600 mt-2`}>
              Tailor your workouts to your goals with the ability to create and
              manage custom routines.
            </p>
          </div>
          <div
            className={`w-1/3 text-center bg-white p-10 rounded-lg shadow-lg flex flex-col items-center`}
          >
            <MdContactSupport className={`text-6xl mb-5`} />
            <h3 className={`text-2xl font-bold`}>Community Support</h3>
            <p className={`text-neutral-600 mt-2`}>
              Join a community of like-minded fitness enthusiasts and share your
              progress.
            </p>
          </div>
        </div>
      </section>
      <section className="my-12 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          What our users say
        </h2>
        <div className="text-lg mt-6 space-y-4">
          <div className="space-y-2 bg-neutral-100 p-4 roudend-lg shadoe-lg">
            <p className="text-gray-700">
              "The perfect app to track my workouts. Now I can see my progress
              and stay motivated."
            </p>
            <span className="text-gray-500 text-sm">- Alex G.</span>
          </div>
          <div className="space-y-2 bg-neutral-100 p-4 roudend-lg shadoe-lg">
            <p className="text-gray-700">
              "I've been using this app for a few months now and it's been a
              game-changer for my fitness journey."
            </p>
            <span className="text-gray-500 text-sm">- María P.</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
