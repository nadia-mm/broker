# Broker Management App

## Overview

The Broker Management App is designed for commercial owners to manage brokers efficiently. It allows users to search for a broker's complete address by entering the broker's name. Users can view search results in a dropdown list, select a broker, and see the broker's details displayed in a card format. If the search results don't meet the user's needs, they can add a new managing broker manually by clicking "Add manually" to complete the proposal.

## Features

- **Search for Brokers**: Users can search for brokers by name, with results displayed in a dropdown list.
- **Add Managing Broker**: If no suitable broker is found, users can add a broker manually through a modal form.

## Technology Stack

- **Frontend**: React, Vite, Material-UI
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB
- **State Management**: React Query for efficient data fetching

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 14.x)
- MongoDB (local or cloud instance)

There are two ways to run the app:
- with Docker
- with Node

## Doker Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   git clone https://github.com/nadia-mm/broker.git
   cd broker
   docker-compose up --build
   ```

2. **Access the Application**:
   Open your web browser and navigate to `http://localhost:5173`.

3. **Access the Swagger document**:
   Open your web browser and navigate to `http://localhost:8080`.


### Node Setup

1. **Navigate to the Backend Directory**:
   ```bash
   git clone https://github.com/nadia-mm/broker.git
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `backend` directory with your MongoDB connection string:
   ```plaintext
   MONGO_URI=<MONGO_URI>>
   PORT=5000
   ```

4. **Run the Backend**:
   ```bash
   npm run dev
   ```

5. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

6. **Install Dependencies**:
   ```bash
   npm install
   ```

7. **Run the Frontend**:
   ```bash
   npm run dev
   ```

8. **Access the Application**:
   Open your web browser and navigate to `http://localhost:5173`.
   
9. **Access the Swagger document**:
   Open your web browser and navigate to `http://localhost:5000/api-docs`.


## Usage

1. **Search for a Broker**:
   - Enter the broker's name in the search input.
   - Select the desired broker from the dropdown list to view their details.

2. **Add a Managing Broker**:
   - If the search results do not meet your requirements, click on the "Add manually" item.
   - Fill in the broker's name, address, city, and country in the modal form.
   - Click "Save" to add the new broker, which will then be displayed in the list.


## Usage

1. **Search for a Broker**:
   - Enter the broker's name in the search input.
   - Select the desired broker from the dropdown list.

2. **Add a Managing Broker**:
   - If the search results do not meet your requirements, click on the "Add manually" button.
   - Fill in the broker's name, address, city, and country in the modal form.
   - Click "Save" to add the new broker, which will then be displayed in the list.

## Testing

For frontend testing, you can run:

```bash
npm test
```