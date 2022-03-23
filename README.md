# Stay-The-Night

Stay The Night is a loose clone of [Airbnb](https://www.airbnb.com/) allowing users to host their spot and allow others to book and review.

## Live Site

A Live deployment of [Stay-The-Night](https://stay-the-night.herokuapp.com/) is hosted on [heroku](https://heroku.com)

## Secren Shots

### Welcome:

![image](https://user-images.githubusercontent.com/91238232/159190707-efa616ea-8a3c-4c5b-8d4e-5399eed9d894.png)

### Spots Listings Page:

![image](https://user-images.githubusercontent.com/91238232/159190714-4b7be05d-aa1b-495f-981a-fe03681a33d2.png)

### Spots Details Page:

![image](https://user-images.githubusercontent.com/91238232/159190722-d903a69d-8d43-44b4-8224-93c89e6711f1.png)
![image](https://user-images.githubusercontent.com/91238232/159190731-3b654096-a12f-4bdd-983a-0f277ae04038.png)

### My Spots:

![image](https://user-images.githubusercontent.com/91238232/159190787-d7917222-11dc-4372-9d37-c3cb11df5354.png)

### 404

![image](https://user-images.githubusercontent.com/91238232/159443700-e0933879-4a2e-472b-934a-72b80ca42ecd.png)

## Technical Difficulties

The Most difficult challenge was finishing the Update feature for spots. The difficulty was cause by allowing users to upload multiple images with a many to one relationship with a single spot. I allowed the functionality to allow users to delete all but 1 picture or allow users to add more images at most 5 when editting their spot. This cause alot of issues, not only do you have to reassign the image.id back to the image object to be queried for update but also return image Url as None-Types instead of an empty string because an empty string would vialate my validators.

### Screen Shots

![image](https://user-images.githubusercontent.com/91238232/159190831-aed62a13-b1f0-4fcf-ba00-d04c8b533d88.png)

![image](https://user-images.githubusercontent.com/91238232/159190873-1d498970-920b-493f-9f97-84f29683e95d.png)

## Features

- Full CRUD Features for Spots
- Full CRUD Features for reviews on a Spot
- Users can see their own listings of spots but not others.

### Future Features

- Users can become a Host
- Spots refractored to only allow Hosts to post a Spot.
- Users can access Full CRUD features for booking
- Users can search for a spot by name,city,state and price,
- Users can favorite a spot.

## Technologies Used

- React.js
- Python
- Flask
- Heroku
- Docker
- PostgreSQL

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

   - Replace 'password' with any that you see fit

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
