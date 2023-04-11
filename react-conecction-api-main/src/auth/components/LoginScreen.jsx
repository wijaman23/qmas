import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import * as userService from '../../services/services-api'

function LoginScreen() {
  const navigation = useNavigate();
  const value = useContext(AuthContext);
  const [showPwd, setshowPwd] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onTouched" });

  const handleLogin = (data) => {
    userService
        .login(data)
        .then((data) => {
            navigation("/mensajes");
        })
        .catch((error) => {
            if (error.response?.data?.errors) {
            const { errors } = error.response.data;
            console.log(errors);
            Object.keys(error.response.data.errors).forEach((error) => {
                setError(error, { message: errors[error].message });
            });
            }
        });
  };

  return (
    <>
      <div className="mb-5 d-flex justify-content-center mt-5">
        <div className="d-flex align-content-center">
          <div className="bg-light p-4 border border-secondary rounded">
            <h2 className="p-2">Inicia sesión</h2>
            <Form
              className="rounded p-4 p-sm-3"
              onSubmit={handleSubmit(handleLogin)}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ususario </Form.Label>
                <Form.Control
                  type="user"
                  placeholder="Usuario"
                  className={`form-control ${errors.user ? "is-invalid" : ""}`}
                  {...register("user", {
                    required: "Usuario es requerido",
                  })}
                />
                {errors.user && (
                  <div className="invalid-feedback">{errors.user.message}</div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <div className="input-group mb-1">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="Contraseña"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", {
                      required: "Contraseña es requerida",
                    })}
                  />
                  <span className="input-group-text" onClick={() => setshowPwd(!showPwd)}>
                    {showPwd ? <FaRegEye /> : <FaEyeSlash /> }
                  </span>
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </Form.Group>
              <Button
                className="mb-3"
                variant="primary"
                type="submit"
                disabled={!isValid}
              >
                Iniciar sesión
              </Button>
              <hr></hr>
              <p style={{ fontSize: 10 }}>
                Al continuar, estás aceptando las Condiciones de uso y la
                Política de Privacidad <br></br>de StravaHack, incluyendo el uso
                de Cookies.
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;