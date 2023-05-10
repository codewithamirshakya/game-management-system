import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createArpStudioBalance1683623102028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'arp_studio_balance',
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
                        name: 'account_type',
                        type: 'integer',
                        isNullable: true,
                    },

                    {
                        name: 'source',
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
        await queryRunner.dropTable('arp_studio_balance')

    }

}
