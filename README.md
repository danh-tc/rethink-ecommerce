# Rethink Ecommer Website

Rethink is an ecommerce website with Spring Boot backend and React JS front end.

## Authentication functions:
Currently, I use JWT tokens for my authentication service, with access tokens having a short TTL and refresh tokens having a long TTL. I try to protect my app by using HTTP-only cookies to prevent XSS and implementing CORS in my backend service. In the future, I plan to update my Spring Security configuration to mitigate CSRF attacks.

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
