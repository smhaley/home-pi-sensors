import "reflect-metadata";
import { MqttService } from "./mqtt/mqtt-service";
import { buildFastifyService } from "./client-service/service";
import AppDataSource from "./db/data-source";
import { CLIENT_SERVICE_PORT } from "../config";

AppDataSource.initialize()
  .then(() => {
    console.log("db connection initialized");
    const MqttServiceInstance = new MqttService();
    MqttServiceInstance.connectAndSubscribe();

    const clientService = buildFastifyService();

    clientService.listen(
      { port: Number(CLIENT_SERVICE_PORT), host: "0.0.0.0" },
      function (err, _address) {
        if (err) {
          clientService.log.error(err);
          process.exit(1);
        }
      }
    );
  })
  .catch((error: unknown) => console.log(`db_error: ${error}`));
