# RIMSS - Retail Inventory Management Software System

Welcome to the RIMSS project! This README file will guide you through the steps to set up and run the mock server and the frontend of the project.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
   - [1. Clone the Repository](#1-clone-the-repository)
   - [2. Install Dependencies](#2-install-dependencies)
4. [Running the Mock Server](#running-the-mock-server)
5. [Running the Frontend](#running-the-frontend)
6. [Building the Frontend](#building-the-frontend)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

RIMSS is a comprehensive retail inventory management software system designed to provide a seamless online shopping experience. It addresses issues such as cross-platform support, performance optimization, and an enhanced user interface.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (>=14.x)
- npm (>=6.x) or Yarn (>=1.x)
- Git

## Getting Started

Follow these steps to get the project up and running on your local machine:

### 1. Clone the Repository

Clone the repository using Git:

```bash
git clone https://github.com/your-username/rimss.git
cd rimss
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
# Install dependencies for the mock server
cd mock-server
npm install

# Install dependencies for the frontend
cd ../frontend
npm install
```

## Running the Mock Server

The mock server simulates the backend APIs required by the frontend. To start the mock server, navigate to the `mock-server` directory and run the following command:

```bash
cd mock-server
npm start
```

The mock server will start on `http://localhost:5000`.

## Running the Frontend

To start the frontend application, navigate to the `frontend` directory and run the following command:

```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:3000`.

## Building the Frontend

To build the frontend application for production, navigate to the `frontend` directory and run the following command:

```bash
cd frontend
npm run build
```

This will create an optimized build in the `frontend/.next` directory. You can serve the built application using:

```bash
npm run start
```

## Contributing

We welcome contributions to the RIMSS project. If you have suggestions or improvements, please submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using RIMSS! If you have any questions or need further assistance, please feel free to contact us.
