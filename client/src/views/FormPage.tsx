import React, { useEffect, useState } from "react";
import LoginForm from "../components/forms/loginForm";
import RegisterForm from "../components/forms/registerForm";
import "./page.style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const FormPage: React.FC = () => {
  const [view, setView] = useState<"login" | "register">("login");

  useEffect(() => {
    setView("login");
  }, []);

  return (
    <div className="formPage">
      <h1 style={{ fontSize: "80px" }}>Clase virtual</h1>

      <div>
        {view === "login" && <LoginForm />}
        {view === "register" && <RegisterForm setView={setView} />}
      </div>
      <div>
        <button
          className="btn btn-outline-primary"
          onClick={() => setView(view === "login" ? "register" : "login")}
        >
          {view === "login" ? "Registrarse" : "Loguearse"}
        </button>
      </div>
    </div>
  );
};
