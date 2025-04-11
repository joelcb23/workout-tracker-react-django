import React from "react";
import Navbar from "./components/Navbar";
import TodayPage from "./pages/TodayPage";
import { Route, Routes } from "react-router-dom";
import RoutineActivePage from "./pages/RoutineActivePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import { RoutineProvider } from "./context/RoutineContext";
import ExerciseForm from "./pages/ExerciseForm";
import RoutinesPage from "./pages/RoutinesPage";
import HomePage from "./pages/HomePage";
import ExercisesFromRoutine from "./pages/ExercisesFromRoutine";
import Footer from "./components/Footer";
import ProtectedRouter from "./ProtectedRouter";

const App = () => {
  return (
    <>
      <AuthProvider>
        <RoutineProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRouter />}>
              <Route path="/today" element={<TodayPage />} />
              <Route
                path="/workout-routine/routines"
                element={<RoutinesPage />}
              />
              <Route
                path={"/workout-routine/routine/:id/:name"}
                element={<ExercisesFromRoutine />}
              />
              <Route
                path="/workout-routine/edit-exercise/:routineId/:exerciseId"
                element={<ExerciseForm />}
              />
              <Route
                path="/workout-routine/active"
                element={<RoutineActivePage />}
              />
              <Route
                path="/workout-routine/active/add-exercise"
                element={<ExerciseForm />}
              />
            </Route>
          </Routes>
          <Footer />
        </RoutineProvider>
      </AuthProvider>
    </>
  );
};

export default App;
