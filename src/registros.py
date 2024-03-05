from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Lista temporal de personas (simulación de una base de datos)
personas = []

@app.route('/registros', methods=['POST'])
def registro():
    datos = request.get_json()
    nombre = datos.get('nombre')
    email = datos.get('email')

    if not nombre or not email:
        return jsonify({'mensaje': 'Se requiere nombre y email'}), 400

    persona = {'nombre': nombre, 'email': email}
    personas.append(persona)

    return jsonify({'mensaje': 'Persona registrada correctamente'}), 201

@app.route('/personas', methods=['GET'])
def get_personas():
    return jsonify(personas)

if __name__ == '__main__':
    app.run(debug=True)
