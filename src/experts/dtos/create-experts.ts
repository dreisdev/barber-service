import { IsNotEmpty, IsEmail } from "class-validator";
export default class CreateExpertDto {
    @IsNotEmpty({ message: "O campo nome é obrigatório" })
    name: string;

    @IsNotEmpty({ message: "O campo email é obrigatório" })
    @IsEmail({}, { message: "O campo precisa ter um formato válido" })
    email: string;

    phone: string;
}