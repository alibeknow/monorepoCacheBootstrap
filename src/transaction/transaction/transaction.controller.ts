import { Controller } from '@nestjs/common';
import { EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ServiceEvents } from '@shared/microservices';
import { TransactionDto } from './transaction.dtos';
import { logger } from '../../shared/logger/logger';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @EventPattern(ServiceEvents.TRANSACTION_SEND)
  async eventHandler(@Payload() eventData: TransactionDto) {
    logger.info(eventData, 'recieve the message');
    try {
      const data = await this.transactionService.checkAndCreate(eventData);
      return data;
    } catch (error) {
      return error;
    }
  }
}
