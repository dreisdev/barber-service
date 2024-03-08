import { IsEmail, IsNotEmpty } from "class-validator";

export default class CreateUsersDto {
    @IsNotEmpty({ message: "O Campo nome é obrigatório" })
    name: string;

    @IsNotEmpty({ message: "O Campo nome é obrigatório" })
    @IsEmail({}, { message: "o campo precisa ter um formato de e-mail válido." })
    email: string;

    @IsNotEmpty({ message: "O Campo password é obrigatório" })
    password: string;
}