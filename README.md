# Blog REST API App using ExpressJs, MongoDB, NodeJs, and Typescript

This repository helps you get started with building a RESTful API using **ExpressJs**, **MongoDB**, **NodeJs**, and **Typescript** in a **Docker** environment.

## Setup and Run Locally (With or Without Docker)

### Prerequisites:
- **Node.js** installed
- **MongoDB** running locally or a MongoDB cloud instance

### Commands to Set Up and Run the App Locally:

#### 1. Clone the GitHub repository:
```bash
$ git clone https://github.com/yeabTesfaye/express-blog-api
$ cd express-blog-api
$ cp .env.example .env

## Directory Structure

.
├── dist/                                # Build files
├── public/                              # Contains static files
├── src/                                 # All source code
│   ├── configs/                         # Contains configuration files
│   ├── models/                          # Contains database schemas and models
│   ├── services/                        # Contains business logic and services
│   ├── controllers/                     # Contains route controllers
│   ├── middlewares/                     # Contains middlewares
│   ├── validators/                      # Contains request validation logic
│   ├── serializers/                     # Contains serializers for data formatting
│   └── routes/                          # Contains API route definitions
├── tests/                               # Contains test files
├── tsconfig.json                        # TypeScript configuration
├── index.ts                             # Entry point of the application
├── package.json                         # Project dependencies and scripts
├── package-lock.json                    # Dependency lock file
└── README.md                            # Project documentation


## API Endpoints

### 1. Get Home URL
- **Endpoint**: `GET /api/v1/`
- **Description**: Returns a simple message indicating the API is working.

### 2. Register User
- **Endpoint**: `POST /api/v1/register`

#### Parameters:

| Parameter | Type   | Description         |
|-----------|--------|---------------------|
| name      | string | Required. Your name |
| email     | string | Required. Your email|
| password  | string | Required. Your password|

- **Response**: The API returns a success message along with user details upon successful registration.

---

### 3. Login User
- **Endpoint**: `POST /api/v1/login`

#### Parameters:

| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| email     | string | Required. Your email |
| password  | string | Required. Your password |

- **Response**: A JWT token is returned upon successful login.

---

### 4. Blogs API

#### GET all Blogs
- **Endpoint**: `GET /api/v1/blogs/`
- **Description**: Returns a list of all blogs.

#### GET a Single Blog
- **Endpoint**: `GET /api/v1/blogs/:id`

#### Parameters:
| Parameter | Type   | Description                    |
|-----------|--------|--------------------------------|
| id        | string | Required. The unique ID of the blog. |

- **Description**: Returns a specific blog by its ID.

#### Create a New Blog
- **Endpoint**: `POST /api/v1/blogs/`

#### Parameters:

| Parameter   | Type   | Description                          |
|-------------|--------|--------------------------------------|
| title       | string | Required. Title of the blog.        |
| description | string | Required. Description of the blog.  |
| image       | string | Optional. Image URL for the blog.   |
| tags        | array  | Optional. Array of tags for the blog.|
| author      | string | Required. Author's ID.              |

#### Update a Blog
- **Endpoint**: `PUT /api/v1/blogs/:id`

#### Parameters:

| Parameter | Type   | Description                     |
|-----------|--------|---------------------------------|
| id        | string | Required. The unique ID of the blog you want to update. |

- **Payload**: Same as the `POST` request (no need to include `id` in the payload).

#### Delete a Blog
- **Endpoint**: `DELETE /api/v1/blogs/:id`

#### Parameters:

| Parameter | Type   | Description                      |
|-----------|--------|----------------------------------|
| id        | string | Required. The unique ID of the blog to delete. |

- **Description**: Deletes the specified blog.


## Contributing

Feel free to fork the repository and submit pull requests. You can also open issues if you find any bugs or have feature requests.
