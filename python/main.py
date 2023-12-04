import os
import time
import accountManagement

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

filePath = 'img/users/pictures/'
manager = accountManagement.AccountManager('localhost', 'root', '', 'todoviajes')

@app.route('/user_account', methods=['GET'])
def ListUsers():
    users = manager.ListUsers()
    return jsonify(users)

@app.route('/user_account/login', methods=['GET'])
def GetUser():
    user = manager.GetUser(request.args.get('user_name'))
    return jsonify(user)

@app.route('/user_account', methods=['POST'])
def SignUser():
    name = request.form['user']
    mail = request.form['mail']
    password = request.form['password']
    birthDate = request.form['birthDate']
    profilePic = request.files['profilePic']
    profilePicName = secure_filename(profilePic.filename)
    
    baseName, extension = os.path.splitext(profilePicName)
    profilePicName = f"{baseName}_{int(time.time())}{extension}"
    profilePic.save(os.path.join(filePath, profilePicName))
    
    if (manager.UserSignIn(name, mail, password, birthDate, profilePicName)):
        return jsonify({"mensaje": "Usuario registrado exitosamente!"}), 201
    else:
        return jsonify({"mensaje": "El usuario ya existe"}), 400

if __name__ == '__main__':
    app.run(debug=True)