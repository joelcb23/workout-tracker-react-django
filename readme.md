# Workout Tracker 🏋️‍♂️

A full-stack app to create, track and manage your workout routines.

## Description

This project allows users to create their own workout routines, track exercises, sets and reps, and monitor their daily progress. It’s built with Django, MySQL, React and Tailwind CSS.

## Features

- User registration and login
- JWT authentication
- Responsive UI built with Tailwind CSS
- Create, update and delete workout routines
- Track daily progress (done/not done/rest)

## Installation

1. Clone the repo.
   ```bash
   git clone https://github.com/joelcb23/workout-tracker-react-django.git
   cd workout-tracker-react-django
   ```
2. Create a new virtual environment.

   ```bash
   python -m venv env
   source env/bin/activate  # On Linux/Mac
   env\Scripts\activate     # On Windows
   ```

3. Install Python dependencies.
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file for backend environment variables. Add `SECRET_KEY`, `DATABASE_URL`, `FRONTEND_URL`, `IS_PRODUCTION`.
5. Apply database migrations.
   ```bash
   python manage.py migrate
   ```
6. Install client dependencies.
   ```bash
   cd client
   npm install
   ```
7. Create a `.env` file inside `/client` for frontend environment variables. Add `VITE_API_URL `.
8. Run the develoment servers in separate terminals:
   - Start Django Backend.
     ```bash
     python manage.py runserver
     ```
   - Start React Frontend.
     ```bash
     npm run dev
     ```

## Usage

- Register a new user or login.
- Create a routine.
- Add exercises to your routine.
- Mark exercises as complete.

## API Endpoints

Main API endpoints

### Auth

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Routines

- `GET /api/routines` - Get all routines
- `POST /api/routines/create` - Create a new routine
- `GET /api/routines/active` - Get active routine

### Exercises

- `GET /api/routines/{id}/exercises` - Get all exercises from routine
- `GET /api/routines/{id}/exercises/{day}` - Get all exercises from a routine for a specific day
- `PUT /api/routines/{id}/exercises/{id}/sets/{id}/mark-set-done` - Mark a set as done

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
