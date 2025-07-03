# Auction Platform

An online auction platform with a Next.js frontend and a suite of Spring Boot microservices.  
It uses Spring Cloud Config for centralized configuration, Eureka for service discovery, and Spring Cloud Gateway for API routing.

---

## 🏛 Architecture

- **Config Server** (`msvc-config`)  
  Centralized configuration for all services (port **8888**) :contentReference[oaicite:0]{index=0}.

- **Eureka Server** (`msvc-eureka`)  
  Service registry on port **8761** :contentReference[oaicite:1]{index=1}.

- **API Gateway** (`msvc-gateway`)  
  Routes requests to downstream services :contentReference[oaicite:2]{index=2}.

- **Auction Service** (`msvc-auction`)  
  - Endpoints under `/api/auctions` and `/api/auction-history`  
  - Runs on port **8085** .

- **Bid Service** (`msvc-bid`)  
  - Endpoints under `/api/bids`  
  - Runs on port **8090** :contentReference[oaicite:3]{index=3}.

- **Transaction Service** (`msvc-payment`)  
  - Endpoints under `/api/transactions`  
  - Runs on port **8100** :contentReference[oaicite:4]{index=4}.

- **Product Service** (`msvc-product`)  
  - Endpoints under `/api/products`  
  - Runs on port **8105** :contentReference[oaicite:5]{index=5}.

- **User Service** (`msvc-user`)  
  - Endpoints under `/api/users`, `/api/auth`  
  - Runs on port **8115** :contentReference[oaicite:6]{index=6}.

- **Search Service** (`search-service`)  
  - Endpoint under `/api/search`  
  - Runs on port **8082** :contentReference[oaicite:7]{index=7}.

- **Chatbot Service** (`msvc-chatbot`)  
  - Endpoints under `/api/chat`, `/api/ping`  
  - Runs on port **8095** :contentReference[oaicite:8]{index=8}.

- **Simulator Service** (`microservice-simulator`)  
  - Endpoints under `/auction`, `/simulate`  
  - Runs on port **8110** :contentReference[oaicite:9]{index=9}.

- **Frontend**  
  Next.js application running on port **3000**.

---

## 📁 Project Structure

├── config-server
├── eureka-server
├── api-gateway
├── auction-service
├── bid-service
├── transaction-service
├── product-service
├── user-service
├── search-service
├── chatbot-service
├── simulator-service
└── frontend

---

## ⚙️ Prerequisites

- Java 17+ & Maven  
- Node.js 14+ & npm/yarn  
- MySQL (create databases: `service_product`, `chatbot_db`, `simulator_db`)  
- (Optional) Docker & Docker Compose  

---

## 🚀 Getting Started

1. **Clone repository**  
   ```bash
   git clone <your-repo-url> && cd auction-platform

2.Setup Databases
-- Shared DB for Auction, Bid, Payment, Product:
CREATE DATABASE service_product;
-- Chatbot DB (run the SQL from chatbot-service):
CREATE DATABASE chatbot_db;
-- Simulator DB:
CREATE DATABASE simulator_db;

3.Start Config Server
cd config-server
mvn clean package
java -jar target/msvc-config-0.0.1-SNAPSHOT.jar

4.Start Eureka Server
cd ../eureka-server
mvn clean package
java -jar target/msvc-eureka-0.0.1-SNAPSHOT.jar

5.Start API Gateway
cd ../api-gateway
mvn clean package
java -jar target/msvc-gateway-0.0.1-SNAPSHOT.jar

6.Start Microservices
mvn clean package
java -jar target/<artifact>-0.0.1-SNAPSHOT.jar

auction-service (8085)
bid-service (8090)
transaction-service (8100)
product-service (8105)
user-service (8115)
search-service (8082)
chatbot-service (8095)
simulator-service (8110)

🔗 API Endpoints
Via Gateway (http://localhost:8080 by default)
| Service        | Base Path                 |
| -------------- | ------------------------- |
| Auction        | `/api/auctions`           |
| AuctionHistory | `/api/auction-history`    |
| Bids           | `/api/bids`               |
| Transactions   | `/api/transactions`       |
| Products       | `/api/products`           |
| Users          | `/api/users`, `/api/auth` |
| Search         | `/api/search`             |
| Chatbot        | `/api/chat`, `/api/ping`  |
| Simulator      | `/auction`, `/simulate`   |

🔧 Configuration
All service URLs, database credentials, etc., are managed in Config Server.
Adjust any service-specific settings in config-server/src/main/resources/configurations/ servicio config.

📄 License

Feel free to adjust module names, artifact versions and ports if they differ in your setup.

MIT
