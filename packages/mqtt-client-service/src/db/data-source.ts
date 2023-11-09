import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import {
  DB_HOST,
  DB_DATABASE,
  DB_PORT,
  DB_PASSWORD,
  DB_USERNAME,
} from "../../config";

let connectionOptions: DataSourceOptions = {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT ? +DB_PORT : 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: ["src/entities/*{.ts,.js}"],
  migrations: ["src/db/migrations/*{.ts,.js}"],
};

export default new DataSource({
  ...connectionOptions,
});
