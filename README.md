# mars-rover-navigator

## Step by step to run the app locally

### 1. Download and installing

    git clone https://github.com/OsmanRodrigues/mars-rover-navigator.git

    docker-compose up

Await 3 to 5 minutes and access the http://localhost:3000/ in your browser

The app UI is running in here and the api on the port 4040

### 2. Running separately

    Make a copy from env.api.defafult in api source and rename it to .env, then run

    yarn dev

    Make a copy from env.app.default in app source and rename it to .env.local, then run

    yarn dev
