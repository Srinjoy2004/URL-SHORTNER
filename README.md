# SwiftLink - A Simple & Beautiful URL Shortener

![SwiftLink Screenshot](swiftlink.png)

**SwiftLink** is a clean, modern, and efficient URL shortening service built with Node.js, Express, and MongoDB. It provides a simple API to create short links and redirects users to the original long URL, tracking the number of clicks along the way.

**Live Demo:** [**https://swiftlink-60ht.onrender.com/**](https://swiftlink-60ht.onrender.com/)

---

## ✨ Features

-   **Shorten Long URLs:** Convert any long URL into a short, easy-to-share SwiftLink.
-   **Seamless Redirection:** Short links automatically and quickly redirect to the original destination.
-   **Click Tracking:** Each click on a short link is counted, providing basic analytics.
-   **Sleek & Modern UI:** A beautiful, responsive frontend with a glass-morphism design, built with Tailwind CSS.
-   **RESTful API:** A simple and clear API for creating short links.
-   **Copy to Clipboard:** Easily copy the generated short URL with a single click.

---

## 🛠️ Tech Stack

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose ODM
-   **Frontend:** HTML, Tailwind CSS, Vanilla JavaScript
-   **ID Generation:** `nanoid` for unique, URL-friendly IDs
-   **Environment Variables:** `dotenv`
-   **Deployment:** Render

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following software installed on your machine:
- [Node.js](https://nodejs.org/) (v20.x or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) or a MongoDB Atlas account.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Create a `.env` file:**
    Create a `.env` file in the root of your project and add your MongoDB connection string.
    ```ini
    # .env file
    MONGO_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/yourDatabase?retryWrites=true&w=majority"
    ```

4.  **Run the server:**
    For development with automatic restarts:
    ```sh
    nodemon index.js
    ```
    Or for a standard start:
    ```sh
    npm start
    ```
    The server will be running on `http://localhost:3000`.

---

## ⚙️ API Endpoints

The application exposes the following API endpoints:

### `POST /api/shorten`
Creates a new short URL.

-   **Request Body:**
    ```json
    {
      "originalUrl": "[https://www.example-long-url.com/some/path](https://www.example-long-url.com/some/path)"
    }
    ```
-   **Success Response (201):**
    ```json
    {
      "shortUrl": "http://localhost:3000/aBcDeFg"
    }
    ```
-   **Error Response (400):**
    ```json
    {
      "error": "Invalid original URL provided."
    }
    ```

### `GET /:shortUrlId`
Redirects to the original URL corresponding to the `shortUrlId`.

-   **Example:** Navigating to `http://localhost:3000/aBcDeFg` will redirect to the original URL and increment the click count.
-   If the ID is not found, it will return a `404 Not Found` status.

---

## ☁️ Deployment

This application is deployed on **Render**. Key steps for deployment include:

1. Pushing the code to a GitHub repository.
2. Creating a new **Web Service** on Render and connecting it to the repository.
3. Setting the **Build Command** to `npm install`.
4. Setting the **Start Command** to `npm start`.
5. Adding the `MONGO_URI` as a secret **Environment Variable** in the Render dashboard.
6. Whitelisting Render's IP addresses in the MongoDB Atlas Network Access list.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

