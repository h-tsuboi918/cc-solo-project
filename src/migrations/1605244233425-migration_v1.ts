import { MigrationInterface, QueryRunner } from "typeorm";

export class migrationV11605244233425 implements MigrationInterface {
  name = "migrationV11605244233425";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tweets" ("id" SERIAL NOT NULL, "Tweetname" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id"))`
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
