import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ExpertsService } from './experts.service';
import CreateExpertDto from './dtos/create-experts';
import { Response } from 'express';

@Controller('experts')
export class ExpertsController {
  constructor(private readonly expertsService: ExpertsService) { }

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

}
