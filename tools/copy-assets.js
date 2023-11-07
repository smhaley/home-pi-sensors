const shell = require("shelljs");

shell.cp("-R", "./packages/mqtt-client-service/dist", "dist/");
shell.cp("-R", "./packages/sensor-app/dist", "dist/src/client-service/public/");
