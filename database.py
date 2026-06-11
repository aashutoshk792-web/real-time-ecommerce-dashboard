import mysql.connector

conn = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="Mysql@123",
    database="ecommerce",
    port=3306
)

cursor = conn.cursor()

print("Database Connected Successfully")

def save_event(event):

    sql = """
    INSERT INTO events(user_id, product, action)
    VALUES (%s, %s, %s)
    """

    values = (
        event["user_id"],
        event["product"],
        event["action"]
    )

    cursor.execute(sql, values)
    conn.commit()

    print("Saved to MySQL:", event)