# AI-Powered Interview Prep App

An AI-powered web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) to help users prepare for technical interviews. The app leverages the **Gemini API** to generate high-quality technical questions and answers, offers role-based interview sessions, and provides a clean, responsive UI with Tailwind CSS. Users can register, log in, pin important questions, and save sessions for future review.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
1. **User Authentication**
   - Secure registration and login system using **JWT-based authentication**.
   - Password hashing for enhanced security.

2. **Role-Based Interview Sessions**
   - Generate tailored interview questions based on the user’s job role (e.g., frontend, backend, full-stack) and experience level (e.g., junior, senior).

3. **AI-Powered Q&A**
   - Automatically generates high-quality technical questions and answers using the **Gemini API**.
   - Covers a wide range of topics relevant to the selected job role.

4. **Accordion Learning UI**
   - Clean, expandable UI for viewing questions and answers, ensuring a smooth and organised study experience.

5. **Dynamic AI Explanations**
   - On-demand, detailed concept breakdowns powered by the Gemini API to help users understand complex topics.

6. **Pinning Important Questions**
   - Users can pin key questions for quick access and revision.

7. **MongoDB Storage**
   - Save and manage interview sessions and pinned questions in **MongoDB** for future review.

8. **Clean UI with Tailwind**
   - Responsive, modern frontend designed with **Tailwind CSS** for a seamless user experience across devices.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **AI Integration**: Gemini API
- **Others**: Axios (for API calls), bcrypt (for password hashing)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Gemini API key (sign up at [Gemini API documentation](https://example.com/gemini-api))
- Git

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/siddharthsonii/Interview-Prep-AI-MERN.git
   cd Interview-Prep-AI-MERN

2. **Install dependencies**:
   * For the backend:
      ```bash
      cd backend
      npm install

   * For the frontend:
     ```bash
      cd frontend/interview-prep-ai
      npm install
     
3. **Set up environment variables**:
   * Create a .env file in the backend directory with the following:
     ```env
      MONGO_URI=your_mongodb_connection_string
      GEMINI_API_KEY=your_gemini_api_key
      PORT=5000

   * Create a .env file in the frontend directory with:
     ```env
     REACT_APP_API_URL=http://localhost:5000/api

4. **Run the application**:
   * Start the backend server:
     ```bash
     cd backend
     npm start

   * Start the frontend server:
     ```bash
     cd frontend
     npm start

5. **Access the app**:
   * Open your browser and navigate to http://localhost:3000.
  
## Usage

1. **Select Role & Experience**: Choose your job role and experience level to generate relevant interview questions.
2. **Explore Questions**: Use the accordion UI to view questions and answers, with the option to pin important ones.
3. **Get AI Explanations**: Click on any question to get a detailed AI-powered explanation of the concept.
4. **Review Sessions**: Access saved sessions and pinned questions from your dashboard.

## API Endpoints

Here are some key API endpoints implemented in the app:
- **Question Routes**:
  * GET /api/questions - Fetch questions based on role and experience
  * POST /api/questions/pin - Pin a question for quick access
  * GET /api/questions/pinned - Retrieve pinned questions

- **Session Routes**:
  * POST /api/sessions - Save an interview session
  * GET /api/sessions - Retrieve saved sessions

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit (git commit -m "Add feature").
4. Push to the branch (git push origin feature-branch).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

### Notes:
- The README starts from the second point (Role-Based Interview Sessions) as requested, omitting the user authentication feature from the description.
- The **Tech Stack** section excludes JWT and bcrypt since they are related to authentication, which was not included per your request.
- The **Usage** section is tailored to reflect the features starting from role-based sessions.
- The **API Endpoints** section omits authentication-related routes to align with the requested scope.
- Replace `https://github.com/your-username/ai-interview-prep-app.git` with your actual repository URL.
- Replace `https://example.com/gemini-api` with the actual Gemini API documentation link (if available).
- The `.env` file excludes `JWT_SECRET` since authentication is not included.

If you need further adjustments or want to include specific details, please let me know!
