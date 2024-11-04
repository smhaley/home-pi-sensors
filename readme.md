# Sensor Service and UI

deployment notes

.envs are needed for deployment

.env template

.env files

- `production.env` 
- `development.env` 

```
MQTT_USERNAME=blah
MQTT_PASSWORD=blah
MQTT_HOST=blah

NODE_ENV=blah

CLIENT_SERVICE_PORT=3002

DB_HOST=blah  ## ensure supports docker networking
DB_PORT=blah
DB_USERNAME=blah
DB_PASSWORD=blah
DB_DATABASE=blah
```

# Dev
Running with `development.env` configs:
```
docker run --name mqtt_db -e POSTGRES_HOST=localhost -e POSTGRES_PORT=5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mqtt postgres:latest
```
Run db Migrations:
`npm run build:db`


