import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards
} from '@nestjs/common';
import { ExpertsService } from './experts.service';
import CreateExpertDto from './dtos/create-experts';
import { Response } from 'express';
import UpdateExpertDto from './dtos/update-experts';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';

@Controller('experts')
export class ExpertsController {
  constructor(private readonly expertsService: ExpertsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateExpertDto, @Res() res: Response) {
    const expertExists = await this.expertsService.findExpertByEmail(data.email)

    if (expertExists) {
      throw new BadRequestException('Já existe profissional com email informado.')
    }

    const expert = await this.expertsService.createExpert(data)
    return res.status(HttpStatus.CREATED).json(expert)
  }

  @Get()
  async getExperts(@Res() res: Response) {
    const experts = await this.expertsService.findAllExperts()
    return res.status(HttpStatus.OK).json(experts)
  }

  @Get(':id')
  async getExpert(@Res() res: Response, @Param('id') id: string) {
    const expert = await this.expertsService.findExpert(id)

    if (!expert) {
      throw new NotFoundException('O profissional não existe.')
    }

    return res.status(HttpStatus.OK).json(expert)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateExpert(@Res() res: Response, @Param('id') id: string, @Body() data: UpdateExpertDto) {
    const expert = await this.expertsService.findExpert(id)

    if (!expert) {
      throw new NotFoundException('O profissional não existe.')
    }

    if (data.email) {

      const emailExists = await this.expertsService.findExpertByEmail(data.email)

      if (emailExists && emailExists.email !== expert.email) {
        throw new BadRequestException('Já existe um outro profissional com email informado.')
      }

    }

    await this.expertsService.updateExpert(id, { ...expert, ...data })
    return res.status(HttpStatus.NO_CONTENT).send()



  }

}
