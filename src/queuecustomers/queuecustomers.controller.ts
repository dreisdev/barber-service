import { Body, Controller, HttpStatus, NotFoundException, Param, Patch, Post, Res } from '@nestjs/common';
import { QueuecustomersService } from './queuecustomers.service';
import CreateQueuecustomersDto from './dtos/create-queuecustomers';
import { Response } from 'express';
import { PrismaService } from 'src/database/prisma.service';

@Controller('queuecustomers')
export class QueuecustomersController {
  constructor(private readonly queuecustomersService: QueuecustomersService) { }

  @Post()
  async addCustomer(
    @Body() data: CreateQueuecustomersDto,
    @Res() res: Response) {
    const queueExists = await this.queuecustomersService.getExpertQueueToday(
      data.expertId
    )

    if (!queueExists) {

      throw new NotFoundException('A fila não existe')
    }

    const customer = await this.queuecustomersService.addCustomers({
      name: data.name,
      service: data.service,
      queueId: queueExists.id
    })

    return res.status(HttpStatus.CREATED).json(customer)
  }

  @Patch(':id')
  async attendCustomer(
    @Param('id') id: string,
    @Res() res: Response) {
    const customer = await this.queuecustomersService.findCustomer(+id)

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado')
    }

    await this.queuecustomersService.attendCustomer(customer.id)
    return res.status(HttpStatus.NO_CONTENT).send()
  }

}
