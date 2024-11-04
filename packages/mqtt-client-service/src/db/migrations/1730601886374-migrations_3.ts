import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730601886374 implements MigrationInterface {
    name = 'Migrations1730601886374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ui_settings" ("id" character varying NOT NULL, "settings" json NOT NULL, CONSTRAINT "PK_d6294dfb76e9dea0bd0d47413dd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ui_settings"`);
    }

}
