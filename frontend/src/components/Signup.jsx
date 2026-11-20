import React from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <div className="sign-up-form-con">
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          type="text"
          placeholder="FullName"
          {...register("name", {
            required: "name can't be an empty.",
          })}
        />
        <input
          type="email"
          placeholder="example@email.com"
          {...register("email", {
            required: "email can't be empty.",
          })}
          id=""
        />
        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters.",
            },
            maxLength: {
              value: 12,
              message: "Password must not exceed 12 characters.",
            },
          })}
          id=""
        />
        <select {...register("role")} id="">
          <option value="user">user</option>
          <option value="recruiter">recruiter</option>
        </select>
        <div>
          <label htmlFor="avtar">profile image :</label>
          <input
            type="file"
            {...register("avtar", {
              required: "avtar image is required.",
            })}
            id=""
          />
        </div>
        <div>
          <label htmlFor="resume">resume :</label>
          <input
            type="file"
            {...register("resumeFile")}
            id=""
          />
        </div>
        <button type="submit">sign up</button>
      </form>
    </div>
  );
};

export default Signup;
