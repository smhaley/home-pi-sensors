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