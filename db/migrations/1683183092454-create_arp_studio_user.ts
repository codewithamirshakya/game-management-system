import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createArpStudioUser1683183092454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'arp_studio_user',
              columns: [
                {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },

                {
                  name: 'username',
                  type: 'text',
                  isNullable: true,
                },
                {
                  name: 'nickname',
                  type: 'text',
                  isNullable: true,
                },
                {
                    name: 'state',
                    type: 'integer',
                    default: 0,
                },
                {
                  name: 'open_url',
                  type: 'text',
                  isNullable: true,
              },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'NOW()',
                  isNullable: true,
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'NOW()',
                  isNullable: true,
                },
              ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('arp_studio_user')

    }

}
