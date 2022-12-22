import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1671707755074 implements MigrationInterface {
    name = 'NewMigrations1671707755074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` varchar(36) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`address\` varchar(100) NOT NULL, \`ipAddress\` varchar(100) NULL, \`lastLoggedAt\` timestamp NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
