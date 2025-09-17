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
