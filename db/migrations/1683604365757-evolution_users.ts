import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class evolutionUsers1683604365757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'evolution_users',
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
                        name: 'country',
                        type: 'text',
                        isNullable: true,
                    },

                    {
                        name: 'uid',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'currency',
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
        await queryRunner.dropTable('evolution_users')

    }

}
