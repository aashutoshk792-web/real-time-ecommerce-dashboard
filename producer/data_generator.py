import pandas as pd

data = {
    "user_id": [1, 2, 3],
    "product": ["Mobile", "Laptop", "Headphone"],
    "action": ["view", "purchase", "add_to_cart"]
}

df = pd.DataFrame(data)

print(df)