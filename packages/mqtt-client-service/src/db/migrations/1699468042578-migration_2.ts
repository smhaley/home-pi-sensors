import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11699468042578 implements MigrationInterface {
    name = 'Migration11699468042578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "upstairs_env" ("id" SERIAL NOT NULL, "topic" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "temp" numeric(6,2) NOT NULL, "pressure" numeric(6,2) NOT NULL, "humidity" numeric(6,2) NOT NULL, CONSTRAINT "PK_d94b69ff8ed183afdb081a5aaa9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "upstairs_env"`);
    }

}
