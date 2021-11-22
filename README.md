# Mars Rover Navigator by Osman Rodrigues

## 1. Description

This web fullstack project based in Node Js consists of the implementation of backend api and frontend app linked through containerization with Docker. 

## 2. Concepts

<li>Clean Architecture</li>
<li>Clean Code</li>

## 3. Main technologies

<li>Backend - Hapi</li>
<li>Frontend - Next Js</li>


## 4. Download and installing

    git clone https://github.com/OsmanRodrigues/mars-rover-navigator.git

    docker-compose up

Await 3 to 5 minutes and access the http://localhost:3000/ in your browser

The app UI is running in here and the api on the port 4040

## 5. Running separately

    Make a copy from env.api.defafult in api source and rename it to .env, then run

    yarn dev
    
    OR
    
    Make a copy from env.app.default in app source and rename it to .env.local, then run

    yarn dev
