import pandas as pd
import random

products = [
    "Mobile",
    "Laptop",
    "Headphone",
    "Keyboard"
]

actions = [
    "view",
    "add_to_cart",
    "purchase"
]

events = []

for i in range(20):

    event = {
        "user_id": random.randint(1,100),
        "product": random.choice(products),
        "action": random.choice(actions)
    }

    events.append(event)

df = pd.DataFrame(events)

print(df)