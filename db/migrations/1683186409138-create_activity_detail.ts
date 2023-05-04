import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createActivityDetail1683186409138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'activity_log_detail',
              columns: [
                {
                  name: 'id',
                  type: 'integer',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },

                {
                  name: 'activity_log_id',
                  type: 'integer',
                  isNullable: true,
                },
                {
                  name: 'objectId',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                    name: 'objectClass',
                    type: 'varchar',
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
        await queryRunner.dropTable('activity_log_detail')

    }

}
