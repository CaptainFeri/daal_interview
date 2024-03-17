import { MigrationInterface, QueryRunner } from 'typeorm';

export class walletMig1000000000002 implements MigrationInterface {
  name?: 'walletMig1000000000002';
  transaction?: true;
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "Wallet" 
        ("id" SERIAL NOT NULL, 
        "created_date" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "updated_date" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "deleted_date" TIMESTAMP WITH TIME ZONE DEFAULT null, 
        "balance" integer NOT NULL DEFAULT 0, 
        "userId" integer NOT NULL,
        CONSTRAINT "PK_WALLET" PRIMARY KEY ("id"))`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "Wallet"`);
  }
}
