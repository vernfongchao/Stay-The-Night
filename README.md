# Stay-The-Night

Stay-The-Night, an [Airbnb](https://www.airbnb.com/) influenced app, is a bookings place for people to rent out a home for many nights instead of a hotel or motel as if they never left their home.

## Live Site

A Live deployment of [Stay-The-Night](https://stay-the-night.onrender.com/) is hosted on [render](https://render.com)

## Wiki

### [Feature List](https://github.com/vernfongchao/Stay-The-Night/wiki/MVP-Feature-List)

List of features needed for the Minimum Viable Product (MVP) and its CRUD features

### [User Stories](https://github.com/vernfongchao/Stay-The-Night/wiki/User-Stories)

List of user stories for each MVP

### [Database Schema](https://github.com/vernfongchao/Stay-The-Night/wiki/Database-Schema)

Schema of how our PostgreSQL database will be set up

### [API Documentation](https://github.com/vernfongchao/Stay-The-Night/wiki/API-Documentation)

API routes that will be used by our backend server

### [Wireframes](https://github.com/vernfongchao/Stay-The-Night/wiki/Wireframes)

Barebones structure of Stay-The-Night


## Screenshots

### Welcome:

![image](https://user-images.githubusercontent.com/91238232/159190707-efa616ea-8a3c-4c5b-8d4e-5399eed9d894.png)

### Spots Listings Page:

![image](https://user-images.githubusercontent.com/91238232/159190714-4b7be05d-aa1b-495f-981a-fe03681a33d2.png)

### Spots Details Page:

![image](https://user-images.githubusercontent.com/91238232/159190722-d903a69d-8d43-44b4-8224-93c89e6711f1.png)
![image](https://user-images.githubusercontent.com/91238232/163907497-50473044-f7d5-40f3-b717-fa09875fc350.png)

### Profile:
![image](https://user-images.githubusercontent.com/91238232/163907608-e8663910-1f48-4fbe-bb0c-8ed2a5a5a090.png)
![image](https://user-images.githubusercontent.com/91238232/163907645-b43c4f62-1b60-43f5-a787-c4666b90c911.png)
![image](https://user-images.githubusercontent.com/91238232/163907689-a856b905-da1f-42dc-ab9c-33ae9b8399d0.png)

### 404

![image](https://user-images.githubusercontent.com/91238232/159443700-e0933879-4a2e-472b-934a-72b80ca42ecd.png)

## Technical Difficulties

The Most difficult challenge was finishing the Update feature for spots. The difficulty was cause by allowing users to upload multiple images with a many to one relationship with a single spot. I allowed the functionality to allow users to delete all but 1 picture or allow users to add more images at most 5 when editting their spot. This cause alot of issues, not only do you have to reassign the image.id back to the image object to be queried for update but also return image Url as None-Types instead of an empty string because an empty string would vialate my validators.

### Screenshots

![image](https://user-images.githubusercontent.com/91238232/159190831-aed62a13-b1f0-4fcf-ba00-d04c8b533d88.png)

![image](https://user-images.githubusercontent.com/91238232/159190873-1d498970-920b-493f-9f97-84f29683e95d.png)

## Features

- Full CRUD Features for Spots
- Full CRUD Features for reviews on a Spot
- Users can access Full CRUD features for booking
- Users can see their own listings of spots but not others.
- Users can become a Host
- Spots refractored to only allow Hosts to post a Spot.
- Setup AWS to allow users to upload and delete images off of their spots.

### Future Features

- Users can search for a spot by name,city,state and price,

## Technologies Used

- React.js
- Python
- Flask
- Heroku
- Docker
- PostgreSQL
- AWS

## Local Installation

1. Clone this repo

   ```bash
   https://github.com/vernfongchao/Stay-The-Night.git
   ```

2. Install dependencies for the back end

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
   
   -Go setup your AWS account and bucket (Please follow this [guide](https://github.com/jamesurobertson/aws-s3-pern-demo#create-your-aws-user-and-bucket) for setup)
   ``` bash
   S3_BUCKET='bucket name'
   S3_KEY='AWS User Key'
   S3_SECRET='Any secret key of your choosing'
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
