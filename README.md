# PAWM-ViLabs-Tugas2
This repo is the upgraded version for project assignment of II3140 - Web and Mobile Application Development. Where students are assigned to create a virtual lab to assist in college studies. In this project I decided to make a virtual lab for computational thinking.

The current running production deployment can be accessed at [Vilabs 2.0](https://vilabs2.vercel.app)

# Table of Contents
1. [Features](#Features)
2. [Usage](#Usage)
3. [Technologies Used](#Technologies-Used)

# Features
- Courses: A collection of materials and exercises that users can use and interact with to learn computational thinking. Their progress in the courses exercises will be saved in the database.
- Login and Register: users can login and register and the system will save them to the supabase database via backend /api/login or /api/register respectively.
- Profile: users can view their profile by clicking the avatar icon on the navbar.

# Usage
Follow these steps to set up the project locally:

## Prerequisites
- [Node.js](https://nodejs.org) (v16+)
- [Python](https://www.python.org/) (v3.8+)

### Backend Setup

`cd backends`

`pip install -r requirements.txt`

`python manage.py migrate`

`python manage.py runserver`

### Frontend Setup

`cd ../frontend`

`npm install`

`npm start `

### Access the Application
Open your browser and navigate to https://127.0.0.1:3000

# Technologies Used
Frontend:
- React.js
- React Router

Backend:
- Django
- Django REST Framework

Database:
- PostgreSQL with Supabase

Authentication:
- JWT (JSON Web Tokens)