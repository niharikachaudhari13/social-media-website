🌐 Social Media Website
A full-stack social media platform built using the MERN stack (MongoDB, Express.js, React, Node.js) that enables users to create profiles, connect with others, post updates, and interact with content—mimicking core functionalities of modern social platforms like LinkedIn or Facebook.

🚀 Features
🔐 Authentication & Authorization

JWT-based login and registration

Secure password hashing with bcrypt

👤 User Profiles

Editable profiles with profile picture, bio, and location

Public and private profile views

📝 Posts & Interactions

Create, edit, and delete posts (text/image/video)

Like and comment system

👥 Connections

Follow/unfollow users

Personalized feed from followed users

🔔 Real-time Notifications

Alerts for likes, comments, and new followers

📦 Media Uploads

Image and video uploads with preview support

📱 Responsive Design

Fully mobile-friendly UI using Tailwind CSS

🛠️ Tech Stack
🔹 Frontend
React.js (with Hooks and Context API)

React Router DOM for navigation

Tailwind CSS for styling

Axios for API calls

🔹 Backend
Node.js

Express.js

MongoDB with Mongoose ODM

Cloudinary for media uploads

JWT for authentication

Multer for file handling



💻 Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/niharikachaudhari13/social-media-website.git
cd social-media-website
2. Setup Backend
bash
Copy
Edit
cd server
npm install
# Configure .env with MONGO_URI, JWT_SECRET, CLOUDINARY keys
npm start
3. Setup Frontend
bash
Copy
Edit
cd client
npm install
# Create .env.local with NEXT_PUBLIC_API_BASE_URL
npm start
✅ Environment Variables
Backend (server/.env):
env
Copy
Edit
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Frontend (client/.env.local):
env
Copy
Edit
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api  
<img width="1366" height="736" alt="Screenshot (175)" src="https://github.com/user-attachments/assets/77a8aab1-de91-494e-9713-3b49ef9107c8" />
<img width="1366" height="721" alt="Screenshot (176)" src="https://github.com/user-attachments/assets/03eb38e2-517d-4e5d-ba35-2ebd039fa0f4" />
<img width="1366" height="721" alt="Screenshot (177)" src="https://github.com/user-attachments/assets/f07cb007-eb5b-49ec-bf6e-4cb1877f6958" />
<img width="1366" height="736" alt="Screenshot (178)" src="https://github.com/user-attachments/assets/3f6860ee-bfcb-41c3-a685-3d6f57daae6a" />
