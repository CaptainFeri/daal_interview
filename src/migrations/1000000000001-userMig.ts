import { MigrationInterface, QueryRunner } from 'typeorm';

export class userMig1000000000001 implements MigrationInterface {
  name?: 'userMig1000000000001';
  transaction?: true;
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "User" 
        ("id" SERIAL NOT NULL, 
        "created_date" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "updated_date" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "deleted_date" TIMESTAMP WITH TIME ZONE DEFAULT null, 
        "username" character varying NOT NULL, 
        CONSTRAINT "PK_USER" PRIMARY KEY ("id"))`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "User"`);
  }
}
