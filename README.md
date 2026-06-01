# Spring Boot + Angular TODO App

A full-stack TODO application with a Spring Boot REST API backend and an Angular frontend, backed by PostgreSQL.

## Tech Stack

**Backend**
- Java 17
- Spring Boot 3.2 (Web, Data JPA, Validation)
- PostgreSQL
- Maven

**Frontend**
- Angular 17
- TypeScript
- RxJS

## Project Structure

```
.
├── backend/                # Spring Boot REST API
│   ├── src/main/java/com/todoapp/
│   │   ├── controller/     # REST endpoints
│   │   ├── service/        # Business logic
│   │   ├── repository/     # JPA repositories
│   │   └── model/          # Entities
│   └── src/main/resources/application.properties
└── frontend/               # Angular app
    └── src/app/
        ├── components/todo-list/
        ├── services/
        └── models/
```

## Prerequisites

- Java 17+
- Node.js 18+ and npm
- PostgreSQL 13+
- Maven (or use the included `mvnw` wrapper)

## Setup

### 1. Database

Create a PostgreSQL database named `tododb`:

```sh
createdb tododb
```

### 2. Backend

Update `backend/src/main/resources/application.properties` with your PostgreSQL credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tododb
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Run the backend:

```sh
cd backend
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 3. Frontend

```sh
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:4200`.

## API Endpoints

Base URL: `http://localhost:8080/api/todos`

| Method | Path        | Description           |
|--------|-------------|-----------------------|
| GET    | `/`         | List all todos        |
| GET    | `/{id}`     | Get a todo by id      |
| POST   | `/`         | Create a new todo     |
| PUT    | `/{id}`     | Update a todo         |
| DELETE | `/{id}`     | Delete a todo         |

### Todo schema

```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2026-06-01T10:00:00"
}
```

## Features

- Create, edit, complete, and delete todos
- Persisted to PostgreSQL via JPA
- Tracks completed and remaining counts
- Validation on required fields

## Build

**Backend**

```sh
cd backend
./mvnw clean package
```

**Frontend**

```sh
cd frontend
npm run build
```
