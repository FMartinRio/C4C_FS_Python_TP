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

@app.route('/user_accounts', methods=['GET'])
def ListUsers():
    users = manager.ListUsers()
    return jsonify(users)

@app.route('/user_account/login', methods=['GET'])
def LoginUser():
    userName = request.args.get('user_name')
    user = manager.GetUser(userName, userName)
    if (user):
        return jsonify(user)
    else:
        return jsonify({'mensaje': 'Usuario no encontrado'}), 404

@app.route('/user_account/signin', methods=['POST'])
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
    
@app.route('/user_account/change_user', methods=['PUT'])
def ChangeUser():
    userName = request.args.get('user')
    newUserName = request.args.get('newUser')
    if (manager.ChangeUserName(userName, newUserName)):
        return jsonify({'mensaje': 'Cambio de nombre exitoso!'}), 201
    else:
        return jsonify({'mensaje': 'El nombre de usuario ya esta en uso'}), 400
    
@app.route('/user_account/change_mail', methods=['PUT'])
def ChangeMail():
    mail = request.args.get('mail')
    newMail = request.args.get('newMail')
    if (manager.ChangeUserMail(mail, newMail)):
        return jsonify({'mensaje': 'Cambio de email exitoso!'}), 201
    else:
        return jsonify({'mensaje': 'El email ya esta en uso'}), 400

@app.route('/user_account/delete', methods=["DELETE"])
def DeleteUser():
    userName = request.args.get('user')
    user = manager.GetUser(userName, userName)
    if (user):
        profilePic = os.path.join(filePath, user['profile_pic'])
        if (os.path.exists(profilePic)):
            os.remove(profilePic)
            
    if (manager.DeleteUser(userName)):
        return jsonify({'mensaje': 'Usuario eliminado correctamente.'}), 201
    else:
        return jsonify({'mensaje': 'Error al eliminar usuario'}), 500
    
if __name__ == '__main__':
    app.run(debug=True)