import streamlit as st
import mysql.connector
import pandas as pd
import matplotlib.pyplot as plt
from streamlit_autorefresh import st_autorefresh

# Auto Refresh every 5 seconds
st_autorefresh(interval=5000, key="refresh")

# Page Title
st.title("🛒 Real-Time E-Commerce Analytics Dashboard")

# MySQL Connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="MYsql@123",
    database="ecommerce"
)

# Read Data
query = "SELECT * FROM events"
df = pd.read_sql(query, conn)

# Top Metrics
col1, col2, col3 = st.columns(3)

with col1:
    st.metric("Total Events", len(df))

with col2:
    st.metric("Total Users", df["user_id"].nunique())

with col3:
    st.metric("Products", df["product"].nunique())

st.divider()

# Events Table
st.subheader("📋 All Events")
st.dataframe(df, use_container_width=True)

# Action Summary
st.subheader("📊 Action Summary")
st.bar_chart(df["action"].value_counts())
st.subheader("📈 Purchase vs View")

action_counts = df["action"].value_counts()

st.bar_chart(action_counts)

# Product Summary
st.subheader("📦 Product Summary")
st.bar_chart(df["product"].value_counts())

# Top Selling Products
st.subheader("🏆 Top Selling Products")

top_products = df["product"].value_counts()

st.bar_chart(top_products)

# Download CSV
st.subheader("⬇ Download Data")

csv = df.to_csv(index=False)

st.download_button(
    label="Download Events CSV",
    data=csv,
    file_name="events.csv",
    mime="text/csv"
)

# Latest Events
st.subheader("🕒 Latest 10 Events")
st.dataframe(df.tail(10), use_container_width=True)
