# Rethink Ecommerce Website

Rethink is an ecommerce website with Spring Boot backend and React JS front end.

## Inspired By
This project is based on ideas from Bouali Ali for the backend and . I have modified and expanded on their original concept.  
See their work here: [https://github.com/ali-bouali/book-social-network].


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

## Contact & Contributing
If you have suggestions or feedback, please open an issue or contact me at:

  📧 Email: [trancongdanh99@gmail.com](mailto:trancongdanh99@gmail.com)  
  🔗 LinkedIn: [Danh Tran Cong](https://www.linkedin.com/in/danhtrancong99/)  
  🐙 GitHub: [Danh Tran Cong](https://github.com/danh-tc)

## License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

