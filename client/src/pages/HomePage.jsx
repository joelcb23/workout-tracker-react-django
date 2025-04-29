import { Link } from "react-router-dom";
import { MdContactSupport, MdEditDocument } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import manTraining from "../assets/man-2604149_1920.jpg";
import womanTraining from "../assets/woman-8865733_1920.jpg";
import calisthenicsPractice from "../assets/calisthenic.jpg";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <header
        className={`bg-[linear-gradient(to_bottom,_#8B5CF6_0%,_#C4B5FD_80%,_#ffffff_100%)] 
          flex flex-col justify-between items-center gap-5
          md:h-[700px] md:gap-10 md:flex-row md:p-10`}
      >
        <div className="order-2 md:order-1 md:w-2/3 text-2xl p-5 md:py-10 flex flex-col gap-y-10">
          <h1 className="text-white text-center text-5xl leading-16 font-bold">
            WELCOME TO YOUR WORKOUT TRACKER
          </h1>
          <p className="text-neutral-600 text-justify md:text-neutral-200">
            Do you want to track your exercises, routines or progress of these?
            This is the perfect place for you!
          </p>
          <div
            className={`${
              isAuthenticated && "hidden"
            } w-full flex flex-col md:flex-row gap-10 justify-center items-center`}
          >
            <Link
              to={"/register"}
              className="bg-purple-500 hover:bg-purple-700 text-white w-full md:w-50 font-semibold rounded-full cursor-pointer text-center p-3 shadow-xl"
            >
              Register now
            </Link>

            <Link
              to={"/login"}
              className="bg-white hover:bg-neutral-200 w-full md:w-50 text-purple-500 border border-purple-500 font-semibold rounded-full cursor-pointer text-center p-3 shadow-xl"
            >
              Login
            </Link>
          </div>
        </div>
        <img
          src={womanTraining}
          alt="woman training in gym"
          className={`order-1 md:order-2 w-full md:w-1/3 rounded-lg`}
        />
      </header>
      <div className={`bg-white flex flex-col items-center text-center py-20`}>
        <h2 className={`text-3xl font-semibold mb-10 p-1`}>
          What do you can do here?
        </h2>
        <p className={`text-neutral-600 text-xl p-1`}>
          This is a place where you can track your routines and exercises.
          Create new routines and add exercises to them. Could also be used to
          track your progress for each exercise.
        </p>
        <div className={`flex justify-center md:gap-10 mt-10 h-64 md:h-96`}>
          <img
            src={manTraining}
            className="mt-10 w-1/2 md:w-1/3 rounded-lg object-cover"
            alt="man training with dumbbells"
          />
          <img
            src={calisthenicsPractice}
            className="mt-10 w-1/2 md:w-1/3 rounded-lg object-cover"
            alt="man training calisthenics"
          />
        </div>
      </div>
      <div className={`my-10 px-7 py-20 bg-purple-300 rounded-lg`}>
        <h2 className={`text-3xl font-semibold text-center mb-10`}>
          Features & Benefits
        </h2>
        <div
          className={`flex flex-col justify-center gap-10
          md:flex-row`}
        >
          <div className={`card`}>
            <GiProgression className={`text-6xl mb-5`} />
            <h3 className={`text-2xl font-bold`}>Track Progress</h3>
            <p className={`text-neutral-600 mt-2`}>
              Monitor your improvement over time with detailed logs of your
              workouts and progress.
            </p>
          </div>
          <div className={`card`}>
            <MdEditDocument className={`text-6xl mb-5`} />
            <h3 className={`text-2xl font-bold`}>Custom Routines</h3>
            <p className={`text-neutral-600 mt-2`}>
              Tailor your workouts to your goals with the ability to create and
              manage custom routines.
            </p>
          </div>
          <div className={`card`}>
            <MdContactSupport className={`text-6xl mb-5`} />
            <h3 className={`text-2xl font-bold`}>Community Support</h3>
            <p className={`text-neutral-600 mt-2`}>
              Join a community of like-minded fitness enthusiasts and share your
              progress.
            </p>
          </div>
        </div>
      </div>
      <div className="my-10 md:my-20 max-w-3xl mx-auto">
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
      </div>
    </>
  );
};

export default HomePage;
