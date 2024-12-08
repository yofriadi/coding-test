# City Temperature Dashboard

This is a simple dashboard that displays the current temperature in a city.

Live preview here https://hendrickscorp-app.vercel.app/dashboard/overview

## Setup

### Database

The database used is PostgreSQL with [Tembo](https://tembo.io/)
with [Time Series](https://tembo.io/docs/product/stacks/analytical/timeseries) stack. You
can sign up then choose the Time Series stack to get the database running or to run it locally
with docker:
1. run `docker run -d --name pg-ts -p 5432:5432 -e POSTGRES_PASSWORD=123456 quay.io/tembo/timeseries-pg:latest`.
2. then exec into the container `docker exec -it pg-ts sh`.
3. run `psql -U postgres` to get into the postgres shell.
4. lastly run the database needs by running queries in folder `/backend/src/database/init.sql`.

### Backend

The backend scaffolded based on [typescript-express-starter](https://github.com/ljlm0402/typescript-express-starter)
with node-postgres template.

run it with docker:
1. add variables to env
```
# PORT
PORT = 3001

# TOKEN
SECRET_KEY = secretKey

# LOG
LOG_FORMAT = dev
LOG_DIR = logs

# CORS
ORIGIN = *
CREDENTIALS = true

# DATABASE
POSTGRES_USER = postgres
POSTGRES_PASSWORD = 123456
POSTGRES_HOST = host.docker.internal
POSTGRES_PORT = 5432
POSTGRES_DB = postgres
```
2. install dependencies with `docker run -it -v $(pwd):/app -w /app node:latest npm i`
3. run the api with `docker run -it -v $(pwd):/app -w /app -p 3001:3001 node:latest npm run start:dev`

### Frontend

The frontend is scaffolded based on [next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter).

run it with docker:
1. install dependencies with `docker run -it -v $(pwd):/app -w /app node:latest npm i`
2. run the app with `docker run -it -v $(pwd):/app -w /app -p 3000:3000 node:latest npm run dev`
3. open the app in browser at `http://localhost:3000/dashboard/overview`
