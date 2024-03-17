import { MigrationInterface, QueryRunner } from 'typeorm';

export class transactionMig1000000000003 implements MigrationInterface {
  name?: 'transactionMig1000000000003';
  transaction?: true;
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "Wallet-Transaction" 
        ("id" SERIAL NOT NULL, 
        "created_date" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "updated_date" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "deleted_date" TIMESTAMP WITH TIME ZONE DEFAULT null, 
        "transactionTypeId" integer NOT NULL, 
        "userId" integer NOT NULL,
        "amount" integer NOT NULL,
        CONSTRAINT "PK_TRANSACTION" PRIMARY KEY ("id"))`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "Wallet-Transaction"`);
  }
}
