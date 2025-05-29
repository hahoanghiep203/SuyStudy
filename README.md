# SuyStudy

# SuyStudy Backend

This is the backend server for the SuyStudy application, built with Node.js, Express, and MongoDB.

## How to Run

Follow these instructions to get the backend server up and running on your local machine for development and testing purposes.

### Prerequisites

* **Node.js:** Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/). (LTS version is recommended).
* **npm:** npm (Node Package Manager) comes with Node.js.
* **MongoDB:** You need a running MongoDB instance. You can install it locally or use a cloud service like MongoDB Atlas.
    * Ensure your MongoDB server is running, typically on `mongodb://localhost:27017`.

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/hahoanghiep203/SuyStudy.git](https://github.com/hahoanghiep203/SuyStudy.git)
    cd SuyStudy
    ```

2.  **Install dependencies:**
    Navigate to the project directory (if you're not already there) and install the required npm packages.
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (if any):**
    While your current `app/config/db.config.js` and `app/config/auth.config.js` use hardcoded values, in a production environment, you would typically use environment variables. For this project as is, the default configurations are:

    * **Database:**
        * Host: `localhost`
        * Port: `27017`
        * Database Name: `suy_study_db`
        * The application will try to connect to `mongodb://localhost:27017/suy_study_db`.
    * **Authentication:**
        * JWT Secret: The `app/config/auth.config.js` file contains `module.exports = { secret: "suy-secret-key" };`. This secret is used for signing and verifying JWTs.

    *No explicit `.env` file setup is described in the provided files, so the application should run with these defaults. If you deploy this, consider moving these to environment variables for security.*

4.  **Initialize Database Roles (Automatic):**
    The `server.js` file includes an `initial()` function that will attempt to create default user roles ("user", "admin") in your MongoDB database if they don't already exist when the server starts.

5.  **Run the application:**
    You can start the server using the following command:
    ```bash
    node server.js
    ```
    Alternatively, if your `package.json` has a start script (e.g., `"start": "node server.js"`), you can use:
    ```bash
    npm start
    ```
    The server will typically run on port `8080` unless specified otherwise by an environment variable `PORT`. You should see a message like "Server is running on port 8080." and "Successfully connected to MongoDB." in your console.

---
# SuyStudy Backend Documentation

## How to Run

Follow these instructions to get the backend server up and running on your local machine for development and testing purposes.

### Prerequisites

* **Node.js:** Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/). (LTS version is recommended).
* **npm:** npm (Node Package Manager) comes with Node.js.
* **MongoDB:** You need a running MongoDB instance. You can install it locally or use a cloud service like MongoDB Atlas.
    * Ensure your MongoDB server is running, typically on `mongodb://localhost:27017`.

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/hahoanghiep203/SuyStudy.git](https://github.com/hahoanghiep203/SuyStudy.git)
    cd SuyStudy
    ```

2.  **Install dependencies:**
    Navigate to the project directory (if you're not already there) and install the required npm packages.
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (if any):**
    While your current `app/config/db.config.js` and `app/config/auth.config.js` use hardcoded values, in a production environment, you would typically use environment variables. For this project as is, the default configurations are:

    * **Database:**
        * Host: `localhost`
        * Port: `27017`
        * Database Name: `suy_study_db`
        * The application will try to connect to `mongodb://localhost:27017/suy_study_db`.
    * **Authentication:**
        * JWT Secret: The `app/config/auth.config.js` file contains `module.exports = { secret: "suy-secret-key" };`. This secret is used for signing and verifying JWTs.

    *No explicit `.env` file setup is described in the provided files, so the application should run with these defaults. If you deploy this, consider moving these to environment variables for security.*

4.  **Initialize Database Roles (Automatic):**
    The `server.js` file includes an `initial()` function that will attempt to create default user roles ("user", "admin") in your MongoDB database if they don't already exist when the server starts.

5.  **Run the application:**
    You can start the server using the following command:
    ```bash
    node server.js
    ```
    Alternatively, if your `package.json` has a start script (e.g., `"start": "node server.js"`), you can use:
    ```bash
    npm start
    ```
    The server will typically run on port `8080` unless specified otherwise by an environment variable `PORT`. You should see a message like "Server is running on port 8080." and "Successfully connected to MongoDB." in your console.

---

## Database Overview

* **Type:** The application uses MongoDB, a NoSQL, document-oriented database. Data is stored in flexible, JSON-like documents.
* **Connection:** The backend is configured to connect to a MongoDB instance at `mongodb://localhost:27017/suy_study_db`.
* **ODM (Object Data Mapper):** Mongoose is used as an Object Data Mapper, providing a schema-based solution to model application data and interact with MongoDB.

---

## Models (Collections/Schemas)

The `app/models/index.js` file initializes and exports all Mongoose models. Each model corresponds to a collection in the MongoDB database.

* **`Role` (`role.model.js`):**
    * **Purpose:** Defines user roles (e.g., "user", "admin").
    * **Fields:**
        * `name`: String
    * **Initialization:** Default roles are created by the `initial()` function in `server.js` if the database is empty.

* **`User` (`user.model.js`):**
    * **Purpose:** Stores user account information.
    * **Fields:**
        * `username`: String (required, unique)
        * `password`: String (required, hashed during signup)
        * `roles`: Array of `ObjectId`s, referencing `Role`.

* **`Course` (`course.model.js`):**
    * **Purpose:** Represents courses or content items.
    * **Fields:**
        * `title`: String (required)
        * `content_code`: String (unique, sparse)
        * `description`: String
        * `body`: String (detailed content)
        * `skill_tags`: Array of Strings
        * `estimated_total_duration_hours`: Number
        * `lessons`: Array of objects (`lesson_title`, `lesson_content_link`, `estimated_lesson_duration_minutes`)
        * `view_count`: Number (default: 0)
        * `author_id`: `ObjectId` referencing `User`
        * `created_at`: Date (default: `Date.now`)
        * `updated_at`: Date (default: `Date.now`)

* **`Comment` (`comment.model.js`):**
    * **Purpose:** Stores user comments and ratings for courses.
    * **Fields:**
        * `content_id`: `ObjectId` referencing `Course` (required)
        * `user_id`: `ObjectId` referencing `User` (required)
        * `username`: String (required)
        * `comment_text`: String (required)
        * `rating`: Number (min: 1, max: 5, optional)
        * `created_at`: Date (default: `Date.now`)
        * `is_approved`: Boolean (default: `true`)

* **`Advertisement` (`advertisement.model.js`):**
    * **Purpose:** Manages advertisements.
    * **Fields:**
        * `title`: String (required)
        * `description`: String
        * `image_url`: String
        * `target_url`: String (link ad leads to)
        * `product_id`: `ObjectId` referencing `Course` (optional)
        * `is_active`: Boolean (default: `true`)
        * `display_count`: Number (default: 0)
        * `created_at`: Date (default: `Date.now`)

* **`ContactSubmission` (`contactSubmission.model.js`):**
    * **Purpose:** Stores messages from the contact form.
    * **Fields:**
        * `name`: String (required)
        * `email`: String (required)
        * `subject`: String
        * `message`: String (required)
        * `submitted_at`: Date (default: `Date.now`)
        * `is_read`: Boolean (default: `false`)

* **`SiteStat` (`siteStat.model.js`):**
    * **Purpose:** Tracks global website statistics.
    * **Fields:**
        * `identifier`: String (default: "global_stats", unique)
        * `total_website_views`: Number (default: 0)
        * `last_updated`: Date (default: `Date.now`)
    * **Static Methods:** `incrementTotalViews()`

* **`Schedule` (`schedule.model.js`):**
    * **Purpose:** Manages user-specific schedules.
    * **Fields:**
        * `user_id`: `ObjectId` referencing `User` (required)
        * `course_id`: `ObjectId` referencing `Course` (optional)
        * `task_title`: String (required)
        * `start_time`: Date (required)
        * `end_time`: Date (required)
        * `status`: String (enum, default: 'pending')
        * `is_ai_generated`: Boolean (default: `true`)
        * `created_at`: Date (default: `Date.now`)

* **`UserPreference` (`userPreference.model.js`):**
    * **Purpose:** Stores individual user learning preferences.
    * **Fields:**
        * `user_id`: `ObjectId` referencing `User` (required, unique)
        * `learning_goals`: Array of Strings
        * `preferred_skills_to_learn`: Array of Strings
        * `time_commitment_hours_per_week`: Number
        * `availability_slots`: Array of objects (`day_of_week`, `start_time_hours`, `end_time_hours`)
        * `preferred_learning_style`: String (enum, optional)
        * `last_updated`: Date (default: `Date.now`)

---

## Workflow (Backend API Endpoints & Logic)

The backend exposes API endpoints defined in `app/routes/` and implemented in `app/controllers/`. Middleware from `app/middlewares/` is used for authentication and authorization.

### Authentication (`auth.routes.js`, `auth.controller.js`)
* **`POST /api/auth/signup`**: Registers a new user.
    * Uses `verifySignUp` middleware for duplicate checks and role validation.
    * Passwords are hashed.
    * Assigns roles, defaulting to "user".
* **`POST /api/auth/signin`**: Logs in an existing user.
    * Validates credentials.
    * Generates and returns a JWT (`accessToken`).

### User Access Control (`user.routes.js`, `user.controller.js`)
* Provides endpoints for testing role-based access (e.g., `/api/test/all`, `/api/test/user`, `/api/test/admin`).
* Uses `authJwt` middleware (`verifyToken`, `isAdmin`, `isModerator`).

### Course Management (`course.routes.js`, `course.controller.js`)
* **`POST /api/courses`**: Create (Admin only)
* **`GET /api/courses`**: Retrieve all (Public)
* **`GET /api/courses/:id`**: Retrieve one (Public)
* **`PUT /api/courses/:id`**: Update (Admin only)
* **`DELETE /api/courses/:id`**: Delete (Admin only)

### Comment Management (`comment.routes.js`, `comment.controller.js`)
* **`POST /api/courses/:courseId/comments`**: Create (Authenticated users)
* **`GET /api/courses/:courseId/comments`**: Retrieve for a course (Public)
* **`DELETE /api/comments/:commentId`**: Delete (Authenticated users, owner/admin check suggested)

### Advertisement Management (`advertisement.routes.js`, `advertisement.controller.js`)
* **`POST /api/advertisements`**: Create (Admin only)
* **`GET /api/advertisements/active`**: Get active ad (Public)
* **`GET /api/advertisements`**: Retrieve all (Admin only)
* **`PUT /api/advertisements/:id`**: Update (Admin only)
* **`DELETE /api/advertisements/:id`**: Delete (Admin only)

### Contact Submissions (`contact.routes.js`, `contact.controller.js`)
* **`POST /api/contact`**: Submit form (Public)
* **`GET /api/contact-submissions`**: Retrieve all (Admin only)
* **`DELETE /api/contact-submissions/:id`**: Delete (Admin only)

### Schedule Management (`schedule.routes.js`, `schedule.controller.js`)
* **`POST /api/schedules`**: Create for logged-in user
* **`GET /api/schedules/me`**: Retrieve for logged-in user
* **`PUT /api/schedules/:id`**: Update (Owner only - middleware suggested)
* **`DELETE /api/schedules/:id`**: Delete (Owner only - middleware suggested)

### User Preferences (`userPreference.routes.js`, `userPreference.controller.js`)
* *(Note: `userPreference.routes.js` currently points to `schedule.controller.js`. This section assumes it's corrected to use `userPreference.controller.js`)*
* **`POST /api/user-preferences/me` (Conceptual)**: Upsert preferences for logged-in user.
* **`GET /api/user-preferences/me` (Conceptual)**: Retrieve preferences for logged-in user.

---

## Implementing on the Frontend (General Guidance)

To interact with this backend from a frontend application:

* **API Client:** Use `axios` or `fetch` API.
* **Authentication Workflow:**
    * Signup/Signin: `POST` to `/api/auth/signup` and `/api/auth/signin`.
    * JWT Handling: Store the received `accessToken` (e.g., in `localStorage`). Include it in the `x-access-token` header for authenticated requests.
    * Logout: Clear the stored token.
* **Fetching Data:** Use `GET` requests to public or authenticated endpoints (e.g., `GET /api/courses`, `GET /api/schedules/me`).
* **Creating/Updating/Deleting Data:** Use `POST`, `PUT`, `DELETE` requests with data in the request body (usually JSON), including the auth token where required.
* **Error Handling:** Check HTTP status codes and backend error messages (`res.status().send({ message: ... })`).
* **Frontend Role-Based UI:** Use user roles (received on signin) to conditionally show/hide UI elements. Backend middleware remains the source of truth for security.

---

### Key Backend Files for Frontend Developer Reference
* **`server.js`**: Shows CORS setup (origin `http://localhost:8081`) and registered routes.
* **Route files in `app/routes/`**: Define API paths, HTTP methods, and applied middleware.
* **Controller files in `app/controllers/`**: Show expected request body structure and response structure.
* **Model files in `app/models/`**: Help understand data structures.

---

*This README provides an overview. Refer to the specific controller and route files for detailed request/response structures and middleware usage.*
