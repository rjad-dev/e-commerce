# E-commerce Project

This project is a full-stack e-commerce application with a separate frontend (Client) and backend (Server).

## Project Structure

The repository is organized into two main folders:

-   `Client/`: Contains the frontend application.
-   `Server/`: Contains the backend application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (which includes npm)
-   [Sequelize CLI](https://sequelize.org/master/manual/migrations.html#the-sequelize-cli) (can be installed globally via `npm install -g sequelize-cli`)

## Backend Setup (Server)

Follow these steps to get the backend server up and running:

1.  **Navigate to the Server Directory:**
    ```bash
    cd Server
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run Database Migrations:**
    This command will set up the necessary database tables.
    ```bash
    npx sequelize-cli db:migrate
    ```

4.  **Run Database Seeds:**
    These commands will populate the database with initial data for users and products.
    ```bash
    npx sequelize-cli db:seed --seed 20250510113651-users.js
    npx sequelize-cli db:seed --seed 20250510114046-products.js
    ```
    *Note: The seed file names suggest specific dates. Ensure these are the correct and latest seed files if others exist.*

5.  **Build Backend in Watch Mode:**
    This command will compile the backend code and watch for any changes, automatically rebuilding when a file is updated.
    ```bash
    npm run build:watch
    ```

6.  **Start Backend in Watch Mode:**
    Open a **new terminal window or tab** (do not close the terminal running `npm run build:watch`). In this new terminal, navigate to the `Server` directory again if necessary, and then run:
    ```bash
    npm run start:watch
    ```
    This command will start the backend server and automatically restart it when code changes are detected.

    Your backend server should now be running.

## Frontend Setup (Client)

Once the backend is running, follow these steps to get the frontend application started:

1.  **Navigate to the Client Directory:**
    Open a new terminal window or tab. If you are in the `Server` directory, you can go back to the root and then into the `Client` directory:
    ```bash
    cd ../Client
    ```
    Or, if you are at the project root:
    ```bash
    cd Client
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *(Note: The original description mentioned `npm run start` for installing dependencies, which is unusual. `npm install` is the standard command. If `npm run start` is indeed intended for a specific script that handles installations, please verify your `package.json` in the `Client` folder.)*

3.  **Start the Frontend Development Server:**
    ```bash
    npm run dev
    ```

    This will typically start the frontend application on a local development server (e.g., `http://localhost:3000` or a similar port – check your terminal output for the exact address).

You should now have both the backend and frontend running and be able to access the e-commerce application in your browser.

## Additional Notes

* Make sure your database server is running before you attempt to run migrations and seeds.
* Check the `config/config.json` file (or the relevant environment-specific configuration file) in the `Server` directory to ensure your database connection details are correct.
