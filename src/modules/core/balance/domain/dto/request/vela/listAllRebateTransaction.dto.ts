import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class ListAllRebateTransactionDto extends DataTransferObject{
    readonly host_id: string;

    readonly member_id?: string;

    readonly start_date?: string;

    readonly end_date?: string;

    readonly start_time?: string;

    readonly end_time?: string;

    readonly key?: string;

    readonly page_size?: string;

}
