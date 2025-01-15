import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RegisterFormInputs } from "../../types/user.types";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm:React.FC<{setView: React.Dispatch<React.SetStateAction<"login" | "register">>}> = ({setView}) => {

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const responde = await axios.post("http://localhost:5001/users/register", data);
      if (responde.status !== 201) { throw new Error("Registration failed") }
      setView("login");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container mt-5">
    <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>

      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">Nombre completo</label>
        <input
          id="fullName"
          className="form-control"
          type="text"
          {...register("fullName", { required: "Full name is required", minLength: 4, maxLength: 50 })}
        />
        {errors.fullName && <div className="text-danger">{errors.fullName.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="userName" className="form-label">Nombre de usuario</label>
        <input
          id="userName"
          className="form-control"
          type="text"
          {...register("userName", { required: "User Name is required", minLength: 4, maxLength: 50 })}
        />
        {errors.userName && <div className="text-danger">{errors.userName.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          id="password"
          className="form-control"
          type="password"
          {...register("password", { required: "Password is required", minLength: 4 })}
        />
        {errors.password && <div className="text-danger">{errors.password.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
        <input
          id="confirmPassword"
          className="form-control"
          type="password"
          {...register("confirmPassword", { required: "Confirm password is required" })}
        />
        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword.message}</div>}
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="mb-3">
        <label htmlFor="role" className="form-label">Rol</label>
        <select
          id="role"
          className="form-select"
          {...register("role", { required: "Role is required" })}
        >
          <option value="user">Usuario</option>
          <option value="moderator">Moderador</option>
        </select>
      </div>

      <button className="btn btn-primary" type="submit">Confirmar</button>
    </form>
  </div>
);
};

export default RegisterForm;