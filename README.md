# Rethink Ecommer Website

Rethink is an ecommerce website with Spring Boot backend and React JS front end.

## Current functions:

  - Register -> Activate via email
  - Login
  - Limit number of login failure
  - Logout
  - Recover account - change password
    
## How to run

For front end:

```bash
cd ecommerce-frontend
npm install
npm run dev
```

For back end:

```bash
cd ecommerce-backend
docker compose up
mvn spring-boot:run
```
