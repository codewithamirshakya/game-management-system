import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class opmgBalance1686038787981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'opmg_balance',
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
                        name: 'trans_id',
                        type: 'text',
                        isNullable: true,
                    },

                    {
                        name: 'amount',
                        type: 'double',
                        default: 0,
                    },
                    {
                        name: 'withdraw_balance',
                        type: 'double',
                        isNullable: true,
                        default: 0,
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
        await queryRunner.dropTable('opmg_balance')

    }

}
