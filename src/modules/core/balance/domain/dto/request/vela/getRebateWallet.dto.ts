import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class GetRebateWalletDto extends DataTransferObject{
    readonly host_id?: string;

    readonly member_id?: string;

    readonly key?: number;

    readonly page_size?: number;

}
