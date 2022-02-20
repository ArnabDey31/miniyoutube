# Running MiniYoutube locally

git pull https://github.com/ArnabDey31/miniyoutube.git

npm install

cd youtube-search-client

npm install && npm run build

cd ..

API_KEY=|YOUR API KEY| NODE_ENV=production DB_URI='|YOUR DB URI|' node app.js

Access the application on http://localhost:3001/

# Running with Docker

docker pull arnabdey/miniyoutube

docker run -d -e API_KEY='|YOUR API KEY|' -e DB_URI='|YOUR DB URI|' -e NODE_ENV='production' -p 3001:3001 arnabdey/miniyoutube

Access the application on http://localhost:3001/

# Hosted Website

https://miniyoutubedemo.herokuapp.com/
