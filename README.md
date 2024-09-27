# Feeder

![Shots 1x (14)](https://github.com/user-attachments/assets/1466ad94-85e8-4dcb-b947-4938892cdce4)

[Feeder](https://feeder.daviddong.me) is a web application with a client-server architecture. 

Follow these steps to set up and run the project.

## Prerequisites

+ Docker
+ Docker Compose
+ Node.js

## Overview

```mermaid
graph TB
    subgraph "Frontend (Port 5173)"
        A[React App]
        B[@apollo/client]
    end

    subgraph "Backend (Port 4000)"
        C[@apollo/server]
        D[GraphQL Service]
        E[Scraper Script]
    end

    F[(MongoDB)]
    G[Scheduled Task]

    A --> B
    B <--> |GraphQL Queries/Mutations| D
    C --> D
    D <--> F
    E --> F
    G --> |Every 6 hours| E

    subgraph "External Websites"
        H[Website 1]
        I[Website 2]
        J[Website 3]
    end

    E -.-> H
    E -.-> I
    E -.-> J

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#bbf,stroke:#333,stroke-width:2px
    style E fill:#bfb,stroke:#333,stroke-width:2px
    style F fill:#fdb,stroke:#333,stroke-width:2px

```

##  Getting Started

+ Clone the repository and navigate to the project root.
+ Set up the database:
    - `docker-compose up --build -d`
+ Ensure you're using the correct Node.js version:
    - `nvm use`

### Setting up the Server

+ Navigate to the server directory: `cd ./server`
+ Create the environment file: `touch .env`
+ Open the .env file and set the MongoDB connection string: `MONGODB_URI=mongodb://root:example@localhost:27017/`
+ Install dependencies: `npm install`
+ Initialize the database:`npm run db:init`
+ Start the server:`npm run start:server`
+ Start the data scraper scripts:`npm run start:scheduler`

> You can use `pm2` to run two scripts simultaneously: `pm2 start ecosystem.config.json`

### Setting up the Client

+ Navigate to the client directory: `cd ./client`
+ Create the environment file: `touch .env`
+ Open the .env file and set the api url string: `VITE_API_URL=http://localhost:4000`
+ Install dependencies: `npm install`
+ Start the development server: `npm run dev`
+ Visit: `http://localhost:5173`

## Task Implementations

### Task 1: Data Scraper with Automation

+ PR: https://github.com/hidaviddong/feeder/pull/1
+ Tech stack: `Node.js`, `Puppeteer`, `MongoDB`, `GraphQL`
+ Description:
    - Use Puppeteer to scrape blog content
	- Implement concurrent scraping with puppeteer-cluster
    - Set up scheduled scraping using cron
	- Manage production Node.js services with PM2
    - Store flexible scraper data in MongoDB
	- Provide data access via GraphQL API

### Task 2: Front-End Framework Optimization

+ PR: https://github.com/hidaviddong/feeder/pull/2
+ Tech stack: `React.js`, `TypeScript`, `TailwindCSS`, `Jotai`, `Vite`.
+ Description:
    - Build with React.js, TypeScript, and Vite for type safety and fast development
	- Style using TailwindCSS and shadcn/ui for customizable UI
	- Manage complex state with Jotai
	- Ensure accessibility and responsive design

### Task 3: Deployment and Scalability Strategy

+ PR: https://github.com/hidaviddong/feeder/pull/3
  
To scale the platform to support 500 blog sites and handle 1 million users:

#### Overall Architecture

- Implement a microservices architecture to allow independent scaling of different components.
- Use containerization (Docker) for consistent deployment across environments.
- Utilize Kubernetes for orchestration to manage scaling and load balancing.

#### Scaling Strategy

- Deploy the React application to a Content Delivery Network (CDN) for global distribution.
- Scale the GraphQL server horizontally using Kubernetes to handle increased load.
- Implement a caching layer (Redis) to reduce database load and improve response times.
- Use a message queue (RabbitMQ) for asynchronous processing of scraping tasks.
- Implement rate limiting to prevent abuse.
- Distribute scraping tasks across multiple worker nodes to handle 500 blog sites efficiently.

