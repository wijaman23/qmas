import React from 'react'
import Header from '../components/Header'
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import * as mensajesService from '../../services/services-api'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"

function MensajeNew() {

    const navigation = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
      } = useForm({ mode: "onTouched" });
      
    const handleCreateMessage = (data) => {
        mensajesService
            .insertMensaje(data)
                .then(() =>  navigation("/mensajes"))
                .catch((error) => {
                    if (error.response?.data?.errors) {
                    const { errors } = error.response.data;
                    console.log(errors);
                    Object.keys(error.response.data.errors).forEach((error) => {
                        setError(error, { message: errors[error].message });
                    });
                    }
                });
    }

  return (
    <>
        <div>
            <Header />
        </div>
        <div className='m-5'>
            <Form
              className="rounded p-4 p-sm-3"
              onSubmit={handleSubmit(handleCreateMessage)}
            >
                <Form.Group className="mb-3 me-5">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Introduzca el titulo"
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    {...register("title", {
                        required: "Titulo es requerido",
                    })}
                    style={{ width: 800 }}
                    />
                    {errors.title && (
                    <div className="invalid-feedback">{errors.title.message}</div>
                    )}
                </Form.Group>
                <Form.Group className="mb-3 me-5">
                    <Form.Label>Texta</Form.Label>
                    <Form.Control
                    as="textarea" rows={6}
                    placeholder="Introduzca el texto"
                    className={`form-control ${errors.text ? "is-invalid" : ""}`}
                    {...register("text", {
                        required: "Texto es requerido",
                    })}
                    style={{ width: 800 }}
                    />
                    {errors.text && (
                    <div className="invalid-feedback">{errors.text.message}</div>
                    )}
                </Form.Group>
                <Form.Group className="mb-3 me-5">
                    <Form.Label>Propiedad</Form.Label>
                    <Form.Select className="mb-3 me-5" aria-label="Especialidad" {...register("category_mensaje")}>
                            <option value="1">Traumatologia</option>
                            <option value="2">Ginecologia</option>
                            <option value="3">Cardiología</option>
                            <option value="4">Medicina interna</option>
                            <option value="5">Nefrologia</option>
                            <option value="6">Neurología</option>
                            <option value="7">Aparato digestivo</option>
                    </Form.Select>    
                </Form.Group>            
                <Button
                    className="mt-3"
                    variant="primary"
                    type="submit"
                    disabled={!isValid}
                >
                  Insertar Mensaje
                </Button>
            </Form>
        </div>
    </>
  )
}

export default MensajeNew