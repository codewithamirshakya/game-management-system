import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createActivityLogs1683185139456 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'activity_logs',
              columns: [
                {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },

                {
                  name: 'game_provider',
                  type: 'integer',
                  isNullable: true,
                },
                {
                  name: 'user_id',
                  type: 'integer',
                  isNullable: true,
                },
                {
                    name: 'activityType',
                    type: 'varchar',
                    isNullable: true,
                },

                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,

                },

                {
                    name: 'ipAddress',
                    type: 'text',
                    isNullable: true,

                },
                {
                    name: 'browserAgent',
                    type: 'text',
                    isNullable: true,

                },
                {
                    name: 'log_time',
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
        await queryRunner.dropTable('activity_logs')

    }

}
