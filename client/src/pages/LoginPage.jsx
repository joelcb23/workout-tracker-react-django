import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    login(data);
    navigate("/");
  });
  return (
    <>
      <div className="text-lg flex flex-col gap-y-5 my-10">
        <h1 className={`text-3xl font-bold text-center`}>LOGIN</h1>
        <p className={`text-neutral-600 text-center`}>
          Welcome again! Please login to your account.
        </p>
      </div>
      <form
        action=""
        onSubmit={onSubmit}
        className={`form-exercise md:w-1/2 mx-auto`}
      >
        <input
          type="text"
          placeholder="USERNAME"
          className="input-forms"
          {...register("username")}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className={`input-forms`}
          {...register("password")}
        />
        <input
          type="submit"
          value="LOGIN"
          className={`w-full py-3 bg-purple-500 rounded-lg text-white font-semibold hover:bg-purpl-700`}
        />
      </form>
      <p className="text-neutral-600 text-lg text-center my-3 ">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-sky-600 underline hover:text-sky-800"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
