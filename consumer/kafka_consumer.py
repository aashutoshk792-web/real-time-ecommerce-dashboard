import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from database import save_event

print("Consumer Started")
print("Reading Events...")

events = [

    {
        "user_id": 10,
        "product": "Laptop",
        "action": "purchase"
    },

    {
        "user_id": 20,
        "product": "Mobile",
        "action": "view"
    }

]

for event in events:

    print("Received:", event)

    save_event(event)

print("Consumer Started")
print("Reading Events...")

events = [

    {
        "user_id": 10,
        "product": "Laptop",
        "action": "purchase"
    },

    {
        "user_id": 20,
        "product": "Mobile",
        "action": "view"
    }

]

for event in events:

    print("Received:", event)

    save_event(event)