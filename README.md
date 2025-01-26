# Basic Authentication API Template

A boilerplate project demonstrating implementation of authentication using modern backend technologies, containerized with Docker for consistent development and deployment environments.

## 🛠️ Technologies

- Node.js
- TypeScript
- GraphQL
- Prisma ORM
- JWT (JSON Web Tokens)
- Docker
- PostgreSQL
- Yarn

## 📋 Features

- User registration and login
- JWT-based authentication
- GraphQL API
- Database integration with Prisma
- TypeScript for type safety
- Containerized environment with Docker
- Docker Compose for multi-container setup

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Git
- Node.js
- Yarn package manager

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
cd [repo-name]
```

2. Start the application using Docker Compose
```bash
docker-compose up -d
```

This will:
- Build the Node.js application container
- Start the PostgreSQL database container
- Set up the necessary network between containers
- Run database migrations
- Start the application

### Development without Docker

If you prefer to run the application without Docker:

1. Install dependencies
```bash
yarn install
```

2. Create a `.env` file in the root directory and add your environment variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
PORT=4000
```

3. Run Prisma migrations
```bash
yarn prisma migrate dev
```

4. Start the development server
```bash
yarn dev
```

## 🏗️ Project Structure

.
├── src/
│   ├── services/            # Services layer
│   │   └── auth/            # Authentication service
│   │       └── auth.ts      # Authentication logic
│   │
│   ├── schema.ts              # GraphQL schema and resolvers
│   │
│   ├── prisma.ts            # Prisma client instance
│   │
│   ├── context.ts           # GraphQL context configuration
│   │
│   └── app.ts               # Main application file
│
├── prisma/
│   ├── migrations/          # Database migrations
│   │   ├── migration.sql    # Initial user table migration
│   │   └── migration_lock.toml # Migration lock file
│   │
│   └── schema.prisma        # Prisma schema definition
│
├── init.sh                  # Initialization script
├── Dockerfile               # Node.js application Dockerfile
├── docker-compose.yml       # Docker compose configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation


## 📝 API Documentation

The API uses GraphQL. After starting the server, you can access the GraphQL Playground at:

http://localhost:4000/graphql


### Available Operations

- `register`: Create a new user account
- `login`: Authenticate a user and receive JWT token

## 🐳 Docker Configuration

The project includes two main containers:
- **app**: The Node.js application
- **db**: PostgreSQL database

### Environment Variables

Docker Compose uses environment variables defined in:
- `.env` file
- `docker-compose.yml`

### Useful Docker Commands

```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build

🔒 Security
Passwords are hashed before storage
JWT tokens for authentication
Environment variables for sensitive data
Isolated container environment
📄 License
This project is licensed under the MIT License - see the LICENSE file for details

✨ Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📦 Scripts
{
  "dev": "Start development server",
  "build": "Build for production",
  "start": "Start production server",
  "prisma:generate": "Generate Prisma Client",
  "prisma:migrate": "Run database migrations"
}

To run a script:

yarn [script-name]
Example: yarn dev





