import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { signup } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signup(data);
    navigate("/");
  });
  return (
    <>
      <div className="text-lg flex flex-col gap-y-5 my-10">
        <h1 className="text-3xl font-bold text-center">SIGNUP</h1>
        <p className={`text-neutral-600 text-center`}>
          Welcome my friend! Let's create your account
        </p>
      </div>
      <form
        action=""
        onSubmit={onSubmit}
        className={`form-exercise md:w-1/2 md:mx-auto`}
      >
        <input
          type="text"
          placeholder="USERNAME"
          className="input-forms"
          {...register("username")}
        />
        <input
          type="email"
          placeholder="EMAIL"
          className={`input-forms`}
          {...register("email")}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className={`input-forms`}
          {...register("password")}
        />
        <input
          type="password"
          placeholder="CONFIRM PASSWORD"
          className={`input-forms`}
          {...register("confirmPassword")}
        />
        <input
          type="submit"
          value="SIGNUP"
          className={`w-full py-3 bg-purple-500 rounded-lg text-white font-semibold hover:bg-purpole-700`}
        />
      </form>
      <p className="text-neutral-600 text-center text-lg my-10 ">
        Already have an account?{" "}
        <Link to="/login" className="text-sky-600 underline hover:text-sky-800">
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
