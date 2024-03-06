import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import CreateExpertDto from './dtos/create-experts';

@Injectable()
export class ExpertsService {
    constructor(private readonly prisma: PrismaService) { }

    async findExpertByEmail(email: string) {
        return await this.prisma.expert.findFirst({
            where: {
                email
            }
        })
    }

    async createExpert(data: CreateExpertDto) {
        return await this.prisma.expert.create({
            data
        })
    }

    async findAllExperts() {
        return await this.prisma.expert.findMany()
    }


}