import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class games1686554339480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'games',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },

                    {
                        name: 'game_name',
                        type: 'text',
                        isNullable: true,
                    },

                    {
                        name: 'game_description',
                        type: 'text',
                        isNullable: true,
                    },

                    {
                        name: 'game_type',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'game_provider_id',
                        type: 'integer',
                        isNullable: true,
                    },

                    {
                        name: 'settings',
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
        await queryRunner.dropTable('games')

    }

}
