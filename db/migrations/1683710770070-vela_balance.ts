import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class velaBalance1683710770070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vela_balance',
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
                        name: 'trans_id',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'currency',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'amount',
                        type: 'double',
                        isNullable: true,
                    },
                    {
                        name: 'withdraw_balance',
                        type: 'double',
                        isNullable: true,
                        default: 0,
                    },
                    {
                        name: 'available_balance',
                        type: 'double',
                        isNullable: true,
                    },
                    {
                        name: 'transaction_date',
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
        await queryRunner.dropTable('vela_balance')

    }

}
