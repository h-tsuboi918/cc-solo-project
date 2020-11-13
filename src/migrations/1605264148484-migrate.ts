import { MigrationInterface, QueryRunner } from "typeorm";

export class migrate1605264148484 implements MigrationInterface {
  name = "migrate1605264148484";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tweets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "tweets" ADD CONSTRAINT "FK_8039099215c037f10c11b0cf228" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tweets" DROP CONSTRAINT "FK_8039099215c037f10c11b0cf228"`
    );
    await queryRunner.query(`DROP TABLE "tweets"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
