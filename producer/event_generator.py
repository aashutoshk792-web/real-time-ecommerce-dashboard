import random
import time

products = ["Mobile", "Laptop", "Headphone", "Keyboard"]
actions = ["view", "add_to_cart", "purchase"]

for i in range(10):

    event = {
        "user_id": random.randint(1, 100),
        "product": random.choice(products),
        "action": random.choice(actions)
    }

    print(event)

    time.sleep(2)