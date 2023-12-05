import mysql.connector

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

    def GetUser(self, user, mail):
        self.cursor.execute(f'SELECT * FROM user_account WHERE user_name = \'{user}\' OR mail = \'{mail}\'')
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
        
    def ChangeUserName(self, userName, newUserName):
        if (self.GetUser(newUserName, newUserName)):
            return False
        
        sql = '''   UPDATE user_account
                    SET user_name = %s
                    WHERE user_name = %s'''
        values = (newUserName, userName)
        self.cursor.execute(sql, values)
        self.conn.commit()
        return self.cursor.rowcount > 0
    
    def ChangeUserMail(self, mail, newMail):
        if (self.GetUser(newMail, newMail)):
            return False
        
        sql = '''   UPDATE user_account
                    SET mail = %s
                    WHERE mail = %s'''
        values = (newMail, mail)
        self.cursor.execute(sql, values)
        self.conn.commit()
        return self.cursor.rowcount > 0
    
    def DeleteUser(self, userName):
        user = self.GetUser(userName, userName)
        if (user):
            self.cursor.execute(f'DELETE FROM user_account WHERE user_name = \'{userName}\'')
            self.conn.commit()
            return self.cursor.rowcount > 0
        
        return False