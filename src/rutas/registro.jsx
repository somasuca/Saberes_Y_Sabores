import React, { useState } from "react";
import '../estilos/registro.css';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { nombre, apellido, email, password };
        try {
            const response = await fetch('http://localhost:5000/registro_usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.status === 200) {
                alert('Usuario Registrado correctamente');
                navigate('/');
            } else {
                console.error('Error:', result.message || 'Error al registrarse');
            }
        } catch (error) {
            console.error('Error de red. Intenta nuevamente más tarde.', error);
        }
    };

    return (
        <div className="contenedorRegistro">
            <form className="formularioRegistro" onSubmit={handleSubmit}>
                <h2 className="tituloRegistro">REGISTRO</h2>
                <div className="inputsRegistro">
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="inputRegistro"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        className="inputRegistro"
                        name="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="inputRegistro"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="inputRegistro"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="botonesRegistro">
                    <Link to="/" className="volverRegistro">Volver</Link>
                    <button type="submit" className="botonRegistro">Crear cuenta</button>
                </div>
                <Link to="/inicioSesion" className="cuentaRegistro">¿ya tienes cuenta? Ingresa</Link>
            </form>
        </div>
    );
};

export default Registro;