import pandas as pd

df = pd.read_csv(
    "events.csv",
    names=["user_id","product","action"]
)

print("="*50)
print("REAL TIME ECOMMERCE ANALYTICS REPORT")
print("="*50)

print("\nTotal Events:", len(df))

print("\nAction Summary")
print(df["action"].value_counts())

print("\nTop Products")
print(df["product"].value_counts())

print("\nTop Users")
print(df["user_id"].value_counts().head(5))