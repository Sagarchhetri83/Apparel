# 🛠️ Backend Architecture Explained (Express + Prisma)

## 1. Why Express.js?
We used **Express.js** because it is the industry-standard "web framework" for Node.js. It handles the low-level HTTP details (like receiving a browser request on port 4001) so we can focus on business logic.

## 2. The "Request Pipeline" (How it works)
When the Frontend sends a request (e.g., "Checkout"), it flows through 4 distinct layers. This shows judges you understand **Separation of Concerns**.

### Layer 1: The Server Entry Point (`server.js`)
*   **What it does:** Starts the engine.
*   **Key Code:** `app.use(express.json())` allows us to read JSON data from the frontend.
*   **Key Code:** `app.use('/sales', salesRoutes)` tells Express: "Any URL starting with `/sales` goes to the Sales Router."

### Layer 2: The Router (`routes/sales.routes.js`)
*   **Role:** Traffic Cop.
*   **What it does:** It looks at the URL and Method (GET vs POST).
*   **Security:** This is where we put the **Auth Middleware**.
*   **Code Example:** `router.post('/checkout', authMiddleware, ...)` ensures only logged-in users enter.

### Layer 3: The Service Layer (`services/sales.service.js`) *CRITICAL*
*   **Role:** The Brain.
*   **Why specific to us:** We moved logic OUT of routes into Services. This makes the code cleaner and reusable.
*   **What it does:** This is where we calculate totals, check stock, and create invoices.
*   **Transaction Logic:** This layer uses `prisma.$transaction()` to ensure that if the Payment fails, the Invoice is effectively cancelled (rolled back).

### Layer 4: The Database Layer (Prisma ORM)
*   **Role:** The Storage.
*   **What it does:** Translates our Javascript objects into SQL queries (`INSERT INTO "SaleOrder"...`).
*   **Why Prisma?** It provides **Type Safety**. If we try to access a field that doesn't exist (like that `total` bug earlier), it warns us.

## 3. Example Flow: "User clicks Pay"
1.  **Frontend** sends `POST /sales/checkout` with Cart Items.
2.  **Express** receives it in `server.js`.
3.  **Router** (`sales.routes.js`) sees the request, checks the JWT Token (`authMiddleware`).
4.  **Router** calls `SalesService.createSaleOrder()`.
5.  **Service** (`sales.service.js`):
    *   Calculates total price.
    *   **Prisma** saves the Order.
    *   **Prisma** creates the Invoice.
6.  **Response** is sent back to Frontend: `{ success: true, orderId: 5 }`.

## 4. Key Terminology for Judges
*   **"Middleware"**: Code that runs *before* the main action (like checking if you are logged in).
*   **"ORM" (Object-Relational Mapping)**: Prisma. It lets us write code like `db.users.create()` instead of raw SQL `INSERT INTO...`.
*   **"REST API"**: The architectural style we used (standard GET/POST methods).
