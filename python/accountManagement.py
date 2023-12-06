import mysql.connector

connection_params = {
    "host": "localhost",        # Replace with your MySQL server hostname or IP address
    "user": "root",        # Replace with your MySQL username
    "password": "",  # Replace with your MySQL password
    "database": "todoviajes"  # Replace with the name of your MySQL database
}

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
        self.conn.close()

    def GetUser(self, user, mail):
        with mysql.connector.connect(**connection_params) as connection:
            with connection.cursor(dictionary=True) as cursor:
                cursor.execute(f'SELECT * FROM user_account WHERE user_name = \'{user}\' OR mail = \'{mail}\'')
                return cursor.fetchone()
    
    def GetFlightTickets(self, userName):
        user = self.GetUser(userName, userName)
        if (user):
            with mysql.connector.connect(**connection_params) as connection:
                with connection.cursor(dictionary=True) as cursor:
                    sql =   f'''  SELECT DISTINCT ft.flight_id, ft.quantity, fl.takeoff_date, fl.takeoff_location, fl.destination
                                FROM flight_ticket AS ft
                                LEFT JOIN user_account AS user ON ft.user_name = \'{userName}\'
                                INNER JOIN flight AS fl ON ft.flight_id = fl.id'''
                    cursor.execute(sql)
                    return cursor.fetchall()
        return False

    def UserSignIn(self, userName, mail, password, profilePic):
        if (self.GetUser(userName, mail)):
            return False
        
        with mysql.connector.connect(**connection_params) as connection:
                with connection.cursor(dictionary=True) as cursor:
                    sql = '''   INSERT INTO user_account(user_name, mail, pass, wallet, profile_pic)
                                VALUES(%s, %s, %s, 0, %s)'''
                    values = (userName, mail, password, profilePic)
                    cursor.execute(sql, values)
                    connection.commit()
        return True
        
    def ChangeUserName(self, userName, newUserName):
        if (self.GetUser(newUserName, newUserName)):
            return False
        with mysql.connector.connect(**connection_params) as connection:
                with connection.cursor(dictionary=True) as cursor:
                    sql = '''   UPDATE user_account
                                SET user_name = %s
                                WHERE user_name = %s'''
                    values = (newUserName, userName)
                    cursor.execute(sql, values)
                    
                    connection.commit()
                    return cursor.rowcount > 0
    
    def ChangeUserMail(self, mail, newMail):
        if (self.GetUser(newMail, newMail)):
            return False
        with mysql.connector.connect(**connection_params) as connection:
                with connection.cursor(dictionary=True) as cursor:
                    sql = '''   UPDATE user_account
                                SET mail = %s
                                WHERE mail = %s'''
                    values = (newMail, mail)
                    cursor.execute(sql, values)
                    connection.commit()
                    return cursor.rowcount > 0
    
    def AddFounds(self, userName, amount):
        user = self.GetUser(userName, userName)
        if (user):
            with mysql.connector.connect(**connection_params) as connection:
                with connection.cursor(dictionary=True) as cursor:
                    newFounds = float(user['wallet']) + float(amount);
                    sql = ('''  UPDATE user_account
                                SET wallet = %s
                                WHERE user_name = %s''')
                    values = (newFounds, userName)
                    cursor.execute(sql, values)
                    connection.commit()
                    return cursor.rowcount > 0
        return False
    
    def DeleteUser(self, userName):
        user = self.GetUser(userName, userName)
        if (user):
            with mysql.connector.connect(**connection_params) as connection:
                with connection.cursor(dictionary=True) as cursor:
                    cursor.execute(f'DELETE FROM user_account WHERE user_name = \'{userName}\'')
                    connection.commit()
                    return cursor.rowcount > 0
        
        return False