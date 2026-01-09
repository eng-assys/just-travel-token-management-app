# Just Travel – Frontend Challenge

This is a **Next.js application** built to solve the **Just Travel Frontend Challenge**.  
The application provides a complete interface for managing tokens, including claiming, listing, viewing details, and tracking usage history.

---

## 🚀 Getting Started (Without Docker)

### Prerequisites
- **Node.js version:** `24.12.0` (recommended)

---

### Install Dependencies

```bash
npm install
```

---

### Run Development Server

```bash
npm run dev
```

---

Open your browser and access:  
👉 **http://localhost:3000**

---

## ✨ Features

### 🔑 Claim Token
- Input field for `userId` (UUID)
- Button to request a token
- Displays the result:
  - `tokenId`
  - `activatedAt`
  - `expiresAt`
- Success and error feedback messages

---

### 📋 Token List
- View **available** and **active** tokens
- Filter tokens by status (`available` / `active`)
- Reload button to refresh the list

---

### 🔍 Token Details
- Display token information
- Show the active user (if any)
- Access the token usage history

---

### 🕒 Token Usage History
- List of token usages with:
  - `userId`
  - `activatedAt`
  - `releasedAt`

---

### 🧹 Clear Active Tokens
- Button to call the `/tokens/clear-active` endpoint
- Success and error feedback messages

---
