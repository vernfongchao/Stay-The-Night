# Stay-The-Night

Stay The Night is a loose clone of Air bnb allowing users to host their spot and allow others to book and review.

## Local Installation

1. Clone this repo

   ```bash
   https://github.com/vernfongchao/Stay-The-Night.git
   ```

2. Instal dependencies for the back end

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Install dependencies for the react front end
   ```bash
   cd react-app
   npm install
   ```
4. Create PostgreSQL user

   ```bash
   CREATE USER stay_the_night_dev WITH CREATEDB PASSWORD 'password'
   ```

5. Create PostgreSQL Database

   ```bash
   CREATE DATABASE stay_the_night_app WITH OWNER stay_the_night_dev
   ```

6. Create a `.env` file in the root directory with the same variables as `.env.example` and change the value of DATABASE_URL and SECRET_KEY

   -Replace 'password' with any that you see fit

   ```bash
   DATABASE_URL=postgresql://stay_the_night_dev:Any_password_here@localhost/stay_the_night_app
   ```

   - Replace the value of SECRET_KEY to any secure encripted string of characters

   ```bash
   SECRET_KEY=Thisistotallynotawellkeptsecretkey,makesureyouchangeit
   ```

7. Flask backend, Migrate, Upgrade, and Seed! In the root directory run

   ```bash
   pipenv shell
   flask db upgrade
   flask seedall
   ```

8. Start back end server while in root directory

   ```bash
   flask run
   ```

9. In a new terminal, enter react frontend directory and run

   ```bash
   npm start
   ```

10. If a new broswer tab does not open, navigate to `localhost:3000` in your browser

11. Start using Stay The Night!, Demo user is set up in the Login form. Please Enjoy!
