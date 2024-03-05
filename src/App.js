import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [personas, setPersonas] = useState([]);

    const handleRegistro = async () => {
        try {
            await axios.post('http://localhost:5000/registros', { nombre, email });
            alert('Persona registrada correctamente');
            setNombre('');
            setEmail('');
            // Actualizar la lista de personas después de registrar una nueva
            fetchData();
        } catch (error) {
            alert('Error al registrar la persona');
        }
    };

    const fetchData = async () => {
        const response = await axios.get('http://localhost:5000/personas');
        setPersonas(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Registro de Persona</h1>
            <label>
                Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button onClick={handleRegistro}>Registrar</button>

            <h2>Personas Registradas</h2>
            <ul>
                {personas.map((persona, index) => (
                    <li key={index}>{persona.nombre} - {persona.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
