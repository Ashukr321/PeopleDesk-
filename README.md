# PeopleDesk

PeopleDesk is a full-featured, modern Contact Management Web App built with the MERN Stack (MongoDB, Express.js, React via Next.js, Node.js). Designed for users who want to efficiently organize and manage their personal and professional contacts, the app also supports advanced user profiles, authentication, and productivity tools.

## Deployment

- 🖥️ **Frontend:** [https://people-desk-delta.vercel.app/](https://people-desk-delta.vercel.app/)
- 🗄️ **Backend:** [https://peopledesk.onrender.com/](https://peopledesk.onrender.com/)


## 📁 Product Documentation

- 📄 [Product Readme](./product_requirements/readme_for_product.md)
- 📝 [User Stories](./product_requirements/user_stories.md)
- 🧱 [Data Model](./product_requirements/data_model.md)
- 🔗 [API List](./product_requirements/api_list.md)
- ✅ [Feature Checklist](./product_requirements/feature_checklist.md)
- 🛠️ [Build Phases](./product_requirements/build_phases.md)
- 📦 [CI/CD Plan](./product_requirements/ci_cd_plan.md)
- 🧪 [Testing Strategy](./product_requirements/testing_strategy.md) <!-- TODO: Add this file if not present -->
- 🗂️ [Docker Plan](./product_requirements/docker_plan.md)



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
- nodemailer 

## Environment Configuration

The project uses environment variables for configuration. Copy the example environment file and fill in your own values:

```bash
# Copy the example environment file
cp backend/.example.env backend/.env
```

### Environment Variables

The following environment variables need to be configured in your `.env` file:

```env
# Server port
PORT=8080

# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/

# Database name
DB_NAME=peopleDesk

# Email credentials for sending emails (use your own email and app password)
USER_EMAIL=your_email@example.com
USER_EMAIL_PASSWORD=your_email_app_password

# JWT secret and token expiry
JWT_SECRET=your_jwt_secret
JWT_TOKEN_EXPIRES_IN=1d

# Client URL (frontend)
CLIENT_URL=https://your-frontend-url.com/
```

**Important Notes:**
- Replace `your_email@example.com` with your actual email address
- Replace `your_email_app_password` with your email app password (not your regular password)
- Generate a strong JWT secret for production
- Update the `CLIENT_URL` to match your frontend deployment URL


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
    ├── mailTemplates/
    │   ├── loginUser.html
    │   └── registerUser.html
    ├── utils/
    │   ├── emailServices.js
    │   └── generateOTP.js
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
    │       ├── user.routes.js
    │       └── user.validation.js
    └── index.js
```

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
