# PeopleDesk

PeopleDesk is a full-featured, modern Contact Management Web App built with the MERN Stack (MongoDB, Express.js, React via Next.js, Node.js). Designed for users who want to efficiently organize and manage their personal and professional contacts, the app also supports advanced user profiles, authentication, and productivity tools.

## Deployment

- 🖥️ **Frontend:** [https://people-desk-delta.vercel.app/](https://people-desk-delta.vercel.app/)
- 🗄️ **Backend:** [https://peopledesk.onrender.com/](https://peopledesk.onrender.com/)






## Requirements & Future Plans
For detailed requirements and future plans, please refer to the PDF document:

[requirement/3._contact_manager.pdf](requirement/3._contact_manager.pdf)

## Tech Stack


**Backend:**
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- joi
- http-errors
- nodemon (development)
- multer
- cloudinary
- http-errors




## Backend Folder Structure

```
backend/
├── app.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
├── .example.env
├── tests/
│   └── app.test.js
└── src/
    ├── config/
    │   ├── connectDb.js
    │   └── envConfig.js
    ├── middlewares/
    │   └── globalErrorHandler.js
    ├── modules/
    │   ├── contact/
    │   │   ├── contact.controller.js
    │   │   ├── contact.model.js
    │   │   └── contact.routes.js
    │   ├── profile/
    │   │   ├── profile.controller.js
    │   │   ├── profile.model.js
    │   │   └── profile.routes.js
    │   └── user/
    │       ├── user.controller.js
    │       ├── user.model.js
    │       └── user.routes.js
    ├── validation/
    └── index.js
```

**How to use:**  
- You can copy and paste this directly into your README.  
- This format uses `├──` and `└──` for branches and `│` for vertical lines, which is a common and visually clear way to represent directory trees in documentation.

Let me know if you want a similar structure for the frontend or any other part of your project!

## Docker Usage

Here are some basic Docker commands to help you get started with containerizing and running this project:

### 1. Build the Backend Docker Image
```bash
cd backend
# Build the Docker image (replace <tag> with your desired image name)
docker build -t peopledesk-backend:<tag> .
```

### 2. Run the Backend Container
```bash
# Run the backend container (replace <tag> with your image tag)
docker run -p 8080:8080 --env-file .env peopledesk-backend:<tag>
```

### 3. Use Docker Compose (Recommended)
```bash
# From the project root, start all services (backend & frontend)
docker-compose up --build

# To stop the services
docker-compose down
```

- Make sure to set up your `.env` files as needed for both backend and frontend before running the containers.
- You can customize ports and environment variables in the `docker-compose.yml` file.

## Author & Maintainer

**Ashutosh Kumar**  
Full Stack Developer (MERN, Next.js)  

- 🌐 [Portfolio: devashu.tech](https://devashu.tech)
- 💻 [GitHub: @Ashukr321](https://github.com/Ashukr321)
- 🔗 [LinkedIn: ashukr321](https://www.linkedin.com/in/ashukr321/)
- 📸 [Instagram: @ashukr321](https://instagram.com/ashukr321)
