# Library Management API
A Library Management System built using **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**. This RESTful API allows users to manage books and borrow records with robust validation, filtering, and business logic enforcement.

## Features

###  **Book Management**
  - Create, Read, Update, Delete books
  - Genre validation (FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)
  - Auto handle availability status based on copy count

### **Borrow System**
  - Borrow books with quantity check
  - Automatically deduct book copies
  - Auto-update book availability

### **Borrow Summary (Aggregation)**
  - Aggregate borrow records
  - Show total borrowed quantity per book with book info

### **Query Support**
  - Filter by genre
  - Sort by any field (e.g., createdAt)
  - Limit results

### **Business Logic**
  - Availability control on borrow
  - Schema-level validation
  - Instance methods (`updateAvailability`)
  - Middleware (`post('save')`) to handle data consistency

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Mongoose Schema validation
- **Dev Tools**: ts-node-dev, dotenv

---
