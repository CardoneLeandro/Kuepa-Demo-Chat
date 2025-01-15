import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { LoginFormInputs } from "../../types/user.types";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("http://localhost:5001/users/login", data);
      if (response.status !== 200) { throw new Error("Login failed") }
      localStorage.setItem("credentials", JSON.stringify(response.data.credentials));
      navigate("/class")
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container mt-5">
      <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Nombre de usuario</label>
          <input
            id="userName"
            className="form-control"
            type="text"
            {...register("userName", { required: "User Name is required" })}
          />
          {errors.userName && <div className="text-danger">{errors.userName.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            id="password"
            className="form-control"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <button className="btn btn-primary" type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginForm