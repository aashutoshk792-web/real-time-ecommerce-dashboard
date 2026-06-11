import mysql.connector

try:
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="MYsql@123",
        database="ecommerce"
    )

    print("Connected Successfully!")

except Exception as e:
    print("ERROR:")
    print(e)