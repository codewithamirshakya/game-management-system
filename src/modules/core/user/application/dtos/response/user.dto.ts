import { Expose } from "class-transformer";

export class UserDTO {
    @Expose()
    readonly fullName: string;

    @Expose()
    readonly email: string;

    @Expose()
    readonly address: string;
}
