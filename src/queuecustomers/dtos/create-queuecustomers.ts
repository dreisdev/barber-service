import { IsNotEmpty } from "class-validator";

export default class CreateQueuecustomersDto {
    @IsNotEmpty({ message: "O campo name é obrigatório" })
    name: string;

    @IsNotEmpty({ message: "O campo service é obrigatório" })
    service: string;

    @IsNotEmpty({ message: "O campo expertId é obrigatório" })
    expertId: string;
}