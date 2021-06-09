import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1619342749055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE user (
            id BIGINT NOT NULL AUTO_INCREMENT,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(1000) NOT NULL,
            name VARCHAR(255) NULL,
            gender TINYINT NOT NULL DEFAULT 1,
            address TEXT NULL,
            birthdate DATE NULL,
            phone VARCHAR(100) NULL,
            coin BIGINT NOT NULL DEFAULT 0,
            isActive BOOLEAN NOT NULL DEFAULT 1,
            created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            INDEX(username)
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
