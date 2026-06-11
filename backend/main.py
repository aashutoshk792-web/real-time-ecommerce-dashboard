from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import mysql.connector
import bcrypt
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
from datetime import datetime, timedelta

app = FastAPI()

# ─────────────────────────────────────────
# JWT Settings
# ─────────────────────────────────────────
SECRET_KEY = "mysecretkey123"
ALGORITHM  = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

security = HTTPBearer()

# ─────────────────────────────────────────
# Pydantic Models
# ─────────────────────────────────────────
class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# ─────────────────────────────────────────
# CORS
# ─────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────
# DB Helper — ek jagah connection banao
# ─────────────────────────────────────────
def get_db():
    return mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="MYsql@123",
        database="ecommerce",
    )

# ─────────────────────────────────────────
# JWT Helpers
# ─────────────────────────────────────────
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token. Please login again."
        )

# ─────────────────────────────────────────
# Home
# ─────────────────────────────────────────
@app.get("/")
def home():
    return {"message": "Real-Time E-Commerce API Running Successfully"}

# ─────────────────────────────────────────
# Health
# ─────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "healthy"}

# ─────────────────────────────────────────
# Register
# ─────────────────────────────────────────
@app.post("/register", status_code=201)
def register(user: UserRegister):
    conn   = get_db()
    cursor = conn.cursor(dictionary=True)

    # Duplicate email check
    cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        raise HTTPException(
            status_code=409,
            detail="Email already registered. Please login."
        )

    hashed = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    )
    cursor.execute(
        "INSERT INTO users(name, email, password) VALUES(%s, %s, %s)",
        (user.name, user.email, hashed.decode("utf-8"))
    )
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "User Registered Successfully"}

# ─────────────────────────────────────────
# Login
# ─────────────────────────────────────────
@app.post("/login")
def login(user: UserLogin):
    conn   = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (user.email,))
    db_user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="No account found with this email."
        )

    if not bcrypt.checkpw(
        user.password.encode("utf-8"),
        db_user["password"].encode("utf-8")
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect password. Please try again."
        )

    token = create_access_token({
        "user_id": db_user["id"],
        "email":   db_user["email"],
        "name":    db_user["name"],
    })

    return {
        "message": "Login Successful",
        "token":   token,
        "user": {
            "id":    db_user["id"],
            "name":  db_user["name"],
            "email": db_user["email"],
        },
    }

# ─────────────────────────────────────────
# /me — Token Check
# ─────────────────────────────────────────
@app.get("/me")
def get_current_user(current_user: dict = Depends(verify_token)):
    return {"message": "Token Valid", "user": current_user}

# ─────────────────────────────────────────
# /events — Live Events
# ─────────────────────────────────────────
@app.get("/events")
def get_events(current_user: dict = Depends(verify_token)):
    conn   = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM events ORDER BY id DESC LIMIT 20")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data

# ─────────────────────────────────────────
# ✅ NEW: /stats — StatCards ke liye
# ─────────────────────────────────────────
@app.get("/stats")
def get_stats(current_user: dict = Depends(verify_token)):
    conn   = get_db()
    cursor = conn.cursor(dictionary=True)

    # Total Revenue (completed orders)
    cursor.execute("""
        SELECT COALESCE(SUM(amount), 0) AS total_revenue
        FROM orders WHERE status = 'completed'
    """)
    revenue = cursor.fetchone()["total_revenue"]

    # Total Orders
    cursor.execute("SELECT COUNT(*) AS total FROM orders")
    total_orders = cursor.fetchone()["total"]

    # Completed Orders
    cursor.execute("SELECT COUNT(*) AS total FROM orders WHERE status = 'completed'")
    completed = cursor.fetchone()["total"]

    # Cancelled Orders
    cursor.execute("SELECT COUNT(*) AS total FROM orders WHERE status = 'cancelled'")
    cancelled = cursor.fetchone()["total"]

    # Total Users
    cursor.execute("SELECT COUNT(*) AS total FROM users")
    total_users = cursor.fetchone()["total"]

    # Total Products
    cursor.execute("SELECT COUNT(*) AS total FROM products")
    total_products = cursor.fetchone()["total"]

    cursor.close()
    conn.close()

    return {
        "revenue":          float(revenue),
        "total_orders":     total_orders,
        "completed_orders": completed,
        "cancelled_orders": cancelled,
        "total_users":      total_users,
        "total_products":   total_products,
    }

# ─────────────────────────────────────────
# ✅ NEW: /orders — Recent Orders Table
# ─────────────────────────────────────────
@app.get("/orders")
def get_orders(current_user: dict = Depends(verify_token)):
    conn   = get_db()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id,
            customer_name,
            product,
            amount,
            status,
            DATE_FORMAT(created_at, '%d %b %Y') AS date
        FROM orders
        ORDER BY created_at DESC
        LIMIT 20
    """)

    orders = cursor.fetchall()
    cursor.close()
    conn.close()

    for o in orders:
        o["amount"] = float(o["amount"])

    return orders

# ─────────────────────────────────────────
# ✅ NEW: /products — Top Products
# ─────────────────────────────────────────
@app.get("/products")
def get_products(current_user: dict = Depends(verify_token)):
    conn   = get_db()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            id,
            name,
            category,
            price,
            sales_count,
            stock
        FROM products
        ORDER BY sales_count DESC
        LIMIT 10
    """)

    products = cursor.fetchall()
    cursor.close()
    conn.close()

    for p in products:
        p["price"] = float(p["price"])

    return products

# ─────────────────────────────────────────
# ✅ NEW: /revenue — Monthly Chart Data
# ─────────────────────────────────────────
@app.get("/revenue")
def get_revenue(current_user: dict = Depends(verify_token)):
    conn   = get_db()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            month_name,
            month_num,
            year,
            revenue,
            orders_count
        FROM revenue_monthly
        ORDER BY year ASC, month_num ASC
    """)

    data = cursor.fetchall()
    cursor.close()
    conn.close()

    for d in data:
        d["revenue"] = float(d["revenue"])

    return data