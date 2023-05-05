import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class velaUsers1683260714160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vela_users',
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
                        name: 'host_id',
                        type: 'text',
                        isNullable: true,
                    },

                    {
                        name: 'member_id',
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
        await queryRunner.dropTable('vela_users')

    }

}
