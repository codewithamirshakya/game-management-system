import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createApiLog1683185112252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'api_log',
              columns: [
                {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },

                {
                  name: 'url',
                  type: 'text',
                  isNullable: true,
                },
                {
                  name: 'requestData',
                  type: 'json',
                  isNullable: true,
                },
                {
                    name: 'response',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'requestedAt',
                    type: 'timestamp',
                    default: 'NOW()',
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
        await queryRunner.dropTable('api_log')

    }

}
