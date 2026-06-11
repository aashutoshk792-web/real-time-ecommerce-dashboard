import mysql.connector
import random
import time

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="MYsql@123",
    database="ecommerce"
)

cursor = conn.cursor()

products = ["Laptop", "Mobile", "Tablet", "Headphone"]
actions = ["view", "purchase"]

while True:

    user_id = random.randint(1, 100)
    product = random.choice(products)
    action = random.choice(actions)

    cursor.execute(
        """
        INSERT INTO events(user_id, product, action)
        VALUES(%s,%s,%s)
        """,
        (user_id, product, action)
    )

    conn.commit()

    print("Event Added")

    time.sleep(2)