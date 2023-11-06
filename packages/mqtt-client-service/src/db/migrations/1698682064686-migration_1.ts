import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11698682064686 implements MigrationInterface {
    name = 'Migration11698682064686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "boiler_temp" ("id" SERIAL NOT NULL, "topic" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "temp" numeric(6,2) NOT NULL, CONSTRAINT "PK_6bc2f003a530b457aae69213d5d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "boiler_temp"`);
    }

}
