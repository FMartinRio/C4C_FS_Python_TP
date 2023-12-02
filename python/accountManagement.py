import mysql.connector
import os
import time

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

class AccountManager:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host = host,
            user = user,
            password = password,
        )
        
        self.cursor = self.conn.cursor()
        
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
        # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err
            
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS user_account (
                                id INT NOT NULL AUTO_INCREMENT,
                                user_name VARCHAR(16) NOT NULL,
                                mail VARCHAR(20) NOT NULL,
                                pass VARCHAR(16) NOT NULL,
                                birth_date DATE NOT NULL,
                                wallet DECIMAL(7,2) NOT NULL DEFAULT 0,
                                PRIMARY KEY(id)
                            );''')
        
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS flight (
                                id INT NOT NULL AUTO_INCREMENT,
                                takeoff_date DATETIME NOT NULL,
                                takeoff_location VARCHAR(20) NOT NULL,
                                destination VARCHAR(20) NOT NULL,
                                price DECIMAL(6,2) NOT NULL,
                                PRIMARY KEY(id)
                            );''')
        
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS flight_ticket (
                                user_id INT NOT NULL,
                                flight_id INT NOT NULL,
                                quantity INT NOT NULL DEFAULT 1,
                                FOREIGN KEY(user_id)
                                    REFERENCES user_account(id),
                                FOREIGN KEY(flight_id)
                                    REFERENCES flight(id)
                            );''')
        self.conn.commit()
        
        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    def GetUser(self, userName, userMail):
        self.cursor.execute(f'SELECT * FROM user_account WHERE user_name = \'{userName}\' OR mail = \'{userMail}\'')
        return self.cursor.fetchone()
    
    def ListUsers(self):
        self.cursor.execute(f'SELECT * FROM user_account')
        return self.cursor.fetchall()

    def UserSignIn(self, userName, mail, password, birthDate, profilePic):
        if (self.GetUser(userName, mail)):
            return False
        
        sql = '''   INSERT INTO user_account(user_name, mail, pass, birth_date, wallet, profile_pic)
                    VALUES(%s, %s, %s, %s, 0, %s)'''
        values = (userName, mail, password, birthDate, profilePic)
        self.cursor.execute(sql, values)
        self.conn.commit()
        return True
    
    def UserLogIn(self, userName, password):
        userAccount = self.GetUser(userName)
        if (not userAccount):
            return False
        
        if (password == userAccount['password']):
            return True

filePath = 'img/users/pictures/'
manager = AccountManager('localhost', 'root', '', 'todoviajes')

@app.route('/user_account', methods=['GET'])
def ListUsers():
    users = manager.ListUsers()
    return jsonify(users)

@app.route('/user_account/<user_name>/<user_mail>', methods=['GET'])
def GetUser(user_name, user_mail):
    user = manager.GetUser(user_name, user_mail)
    if (user):
        return jsonify(user)
    else:
        return 'Usuario no encontrado', 404
    

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