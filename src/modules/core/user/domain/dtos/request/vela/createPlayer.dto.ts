import { DataTransferObject } from "../../../../../../../lib/dto/dataTransferObject";

export class CreatePlayerDto extends DataTransferObject{
  readonly host_id: string;

  readonly member_id: string;

  readonly currency: string;
}