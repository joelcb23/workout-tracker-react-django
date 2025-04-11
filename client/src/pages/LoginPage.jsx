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
    <div
      className={`bg-white max-w-[1080px] mx-auto my-48 flex flex-col gap-y-5  px-10 py-20 rounded-xl`}
    >
      <div className="flex flex-col gap-y-3 my-3">
        <h1 className={`text-3xl font-bold text-center`}>LOGIN</h1>
        <p className={`text-neutral-600 text-center`}>
          Welcome again! Please login to your account.
        </p>
      </div>
      <form
        action=""
        onSubmit={onSubmit}
        className={`w-1/2 mx-auto flex flex-col gap-y-5`}
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
          className={`w-full py-3 bg-sky-500 rounded-lg text-white font-semibold hover:bg-sky-600`}
        />
      </form>
      <p className="text-neutral-600 text-center my-3 ">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-sky-600 underline hover:text-sky-800"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
